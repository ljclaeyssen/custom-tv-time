import { Location } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimelineItem } from '../../../../domain/models/timeline.model';
import { TimelinesStore } from '../../../../store/timelines.store';
import { RetrieveTimelineDetail } from '../../../../use-cases/retrieve-timeline-detail';
import { WatchTimelineItem } from '../../../../use-cases/watch-timeline-item';
import { tmdbImage } from '../../../../utils/tmdb-image';
import { EmptyState } from '../../../shared/empty-state/empty-state';
import { PosterImg } from '../../../shared/poster-img/poster-img';
import { ProgressBar } from '../../../shared/progress-bar/progress-bar';

@Component({
  selector: 'app-timeline-detail',
  imports: [RouterLink, EmptyState, PosterImg, ProgressBar],
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
    if (minutes <= 0) {
      return null;
    }
    if (minutes < 60) {
      return `≈ ${minutes} min restantes`;
    }
    return `≈ ${Math.round(minutes / 60).toLocaleString('fr-FR')} h restantes`;
  });

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
