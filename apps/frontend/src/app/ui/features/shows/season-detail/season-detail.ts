import { Component, inject, input, numberAttribute, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { EpisodeWithState } from '../../../../domain/models/show.model';
import { ShowsStore } from '../../../../store/shows.store';
import { MarkSeasonWatched } from '../../../../use-cases/mark-season-watched';
import { RetrieveSeasonEpisodes } from '../../../../use-cases/retrieve-season-episodes';
import { ToggleEpisodeWatched } from '../../../../use-cases/toggle-episode-watched';
import { EmptyState } from '../../../shared/empty-state/empty-state';

@Component({
  selector: 'app-season-detail',
  imports: [DatePipe, EmptyState],
  templateUrl: './season-detail.html',
  styleUrl: './season-detail.scss',
})
export class SeasonDetail implements OnInit {
  readonly tmdbId = input.required({ transform: numberAttribute });
  readonly seasonNumber = input.required({ transform: numberAttribute });

  protected readonly store = inject(ShowsStore);
  readonly #location = inject(Location);
  readonly #retrieveSeasonEpisodes = inject(RetrieveSeasonEpisodes);
  readonly #toggleEpisodeWatched = inject(ToggleEpisodeWatched);
  readonly #markSeasonWatched = inject(MarkSeasonWatched);

  ngOnInit(): void {
    this.#retrieveSeasonEpisodes.execute(this.tmdbId(), this.seasonNumber());
  }

  protected back(): void {
    this.#location.back();
  }

  protected toggle(episode: EpisodeWithState): void {
    this.#toggleEpisodeWatched.execute(
      this.tmdbId(),
      episode.seasonNumber,
      episode.episodeNumber,
      !episode.watched,
    );
  }

  protected markAll(): void {
    this.#markSeasonWatched.execute(this.tmdbId(), this.seasonNumber());
    this.#retrieveSeasonEpisodes.execute(this.tmdbId(), this.seasonNumber());
  }

  protected isAired(episode: EpisodeWithState): boolean {
    return episode.airDate !== null && episode.airDate <= new Date().toISOString().slice(0, 10);
  }
}
