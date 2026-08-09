import { Component, computed, inject, input, numberAttribute, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FOLLOW_STATUS_OPTIONS } from '../../../shared/follow-status-meta';
import { FollowStatus } from '../../../../domain/models/show.model';
import { ShowsStore } from '../../../../store/shows.store';
import { MarkSeasonWatched } from '../../../../use-cases/mark-season-watched';
import { RetrieveShowProgress } from '../../../../use-cases/retrieve-show-progress';
import { ToggleShowFollow } from '../../../../use-cases/toggle-show-follow';
import { UpdateShowStatus } from '../../../../use-cases/update-show-status';
import { tmdbImage } from '../../../../utils/tmdb-image';
import { ProgressBar } from '../../../shared/progress-bar/progress-bar';

@Component({
  selector: 'app-show-detail',
  imports: [RouterLink, ProgressBar],
  templateUrl: './show-detail.html',
  styleUrl: './show-detail.scss',
})
export class ShowDetail implements OnInit {
  readonly tmdbId = input.required({ transform: numberAttribute });

  protected readonly store = inject(ShowsStore);
  protected readonly statusOptions = FOLLOW_STATUS_OPTIONS;
  readonly #location = inject(Location);
  readonly #retrieveShowProgress = inject(RetrieveShowProgress);
  readonly #toggleFollow = inject(ToggleShowFollow);
  readonly #updateStatus = inject(UpdateShowStatus);
  readonly #markSeasonWatched = inject(MarkSeasonWatched);

  protected readonly backdropUrl = computed(() =>
    tmdbImage(this.store.currentShow()?.detail.backdropPath ?? null, 'w780'),
  );
  protected readonly posterUrl = computed(() =>
    tmdbImage(this.store.currentShow()?.detail.posterPath ?? null, 'w342'),
  );

  ngOnInit(): void {
    this.#retrieveShowProgress.execute(this.tmdbId());
  }

  protected back(): void {
    this.#location.back();
  }

  protected toggleFollow(): void {
    const show = this.store.currentShow();
    if (show) {
      this.#toggleFollow.execute(this.tmdbId(), !show.followed);
    }
  }

  protected setStatus(status: string): void {
    this.#updateStatus.execute(this.tmdbId(), status as FollowStatus);
  }

  protected markSeason(seasonNumber: number): void {
    this.#markSeasonWatched.execute(this.tmdbId(), seasonNumber);
  }
}
