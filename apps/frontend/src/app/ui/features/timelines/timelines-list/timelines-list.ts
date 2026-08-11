import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimelineSummary } from '../../../../domain/models/timeline.model';
import { TimelinesStore } from '../../../../store/timelines.store';
import { RetrieveTimelines } from '../../../../use-cases/retrieve-timelines';
import { tmdbImage } from '../../../../utils/tmdb-image';
import { EmptyState } from '../../../shared/empty-state/empty-state';
import { PosterCard } from '../../../shared/poster-card/poster-card';

@Component({
  selector: 'app-timelines-list',
  imports: [RouterLink, EmptyState, PosterCard],
  templateUrl: './timelines-list.html',
  styleUrl: './timelines-list.scss',
})
export class TimelinesList implements OnInit {
  protected readonly store = inject(TimelinesStore);
  readonly #retrieveTimelines = inject(RetrieveTimelines);

  ngOnInit(): void {
    this.#retrieveTimelines.execute();
  }

  protected poster(timeline: TimelineSummary): string | null {
    return tmdbImage(timeline.posterPath, 'w342');
  }

  protected sublabel(timeline: TimelineSummary): string {
    return `${timeline.completedCount} / ${timeline.itemCount}`;
  }
}
