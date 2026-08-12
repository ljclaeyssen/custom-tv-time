import { DatePipe, Location } from '@angular/common';
import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimelineItem } from '../../../../domain/models/timeline.model';
import { TimelineSection, TimelinesStore } from '../../../../store/timelines.store';
import { RetrieveTimelineDetail } from '../../../../use-cases/retrieve-timeline-detail';
import { WatchTimelineItem } from '../../../../use-cases/watch-timeline-item';
import { formatMinutes } from '../../../../utils/format-minutes';
import { tmdbImage } from '../../../../utils/tmdb-image';
import { EmptyState } from '../../../shared/empty-state/empty-state';
import { PosterImg } from '../../../shared/poster-img/poster-img';
import { ProgressBar } from '../../../shared/progress-bar/progress-bar';

@Component({
  selector: 'app-timeline-detail',
  imports: [DatePipe, RouterLink, EmptyState, PosterImg, ProgressBar],
  templateUrl: './timeline-detail.html',
  styleUrl: './timeline-detail.scss',
})
export class TimelineDetail implements OnInit {
  readonly slug = input.required<string>();

  protected readonly store = inject(TimelinesStore);
  readonly #location = inject(Location);
  readonly #retrieveTimelineDetail = inject(RetrieveTimelineDetail);
  readonly #watchTimelineItem = inject(WatchTimelineItem);

  /** La frise affichée — jamais celle d'une navigation précédente. */
  protected readonly timeline = computed(() => {
    const current = this.store.current();
    return current?.slug === this.slug() ? current : null;
  });

  /** « ≈ 41 h restantes » — null si la frise est finie (ou rien à voir). */
  protected readonly remainingLabel = computed(() => {
    const minutes = this.timeline()?.remainingMinutes ?? 0;
    return minutes > 0 ? `${this.remaining(minutes)} restantes` : null;
  });

  /** « ≈ 12 h passées » — null tant que rien n'a été vu sur la frise. */
  protected readonly watchedLabel = computed(() => {
    const minutes = this.timeline()?.watchedMinutes ?? 0;
    return minutes > 0 ? `${this.remaining(minutes)} passées` : null;
  });

  /**
   * Sections terminées dépliées à la main (indexes). État volontairement local
   * et volatil : tout est replié à nouveau au rechargement de l'écran.
   */
  readonly #expandedSections = signal<ReadonlySet<number>>(new Set());

  protected remaining(minutes: number): string {
    return formatMinutes(minutes);
  }

  protected isCollapsed(section: TimelineSection, index: number): boolean {
    return section.completed && !this.#expandedSections().has(index);
  }

  protected toggleSection(section: TimelineSection, index: number): void {
    if (!section.completed) {
      return;
    }
    this.#expandedSections.update((expanded) => {
      const next = new Set(expanded);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  ngOnInit(): void {
    this.#retrieveTimelineDetail.execute(this.slug());
  }

  protected back(): void {
    this.#location.back();
  }

  protected poster(item: TimelineItem): string | null {
    return tmdbImage(item.posterPath, 'w342');
  }

  protected sublabel(item: TimelineItem): string {
    const kind = item.itemType === 'movie' ? 'Film' : `Saison ${item.seasonNumber}`;
    const year = item.releaseDate?.slice(0, 4);
    return year ? `${kind} · ${year}` : kind;
  }

  protected watch(item: TimelineItem): void {
    this.#watchTimelineItem.execute(this.slug(), item.id);
  }
}
