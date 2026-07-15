import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CatalogSearchResult } from '../../../../domain/models/catalog.model';
import { ExploreStore } from '../../../../store/explore.store';
import { SearchCatalog } from '../../../../use-cases/search-catalog';
import { TrackMovie } from '../../../../use-cases/track-movie';
import { tmdbImage } from '../../../../utils/tmdb-image';
import { EmptyState } from '../../../shared/empty-state/empty-state';
import { ExploreSearchForm } from './explore-search.form';

@Component({
  selector: 'app-explore',
  imports: [ReactiveFormsModule, EmptyState],
  templateUrl: './explore.html',
  styleUrl: './explore.scss',
})
export class Explore implements OnInit {
  protected readonly store = inject(ExploreStore);
  protected readonly form = new ExploreSearchForm();
  readonly #searchCatalog = inject(SearchCatalog);
  readonly #trackMovie = inject(TrackMovie);
  readonly #router = inject(Router);

  constructor() {
    this.form.query.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((query) => this.#searchCatalog.execute(query));
  }

  ngOnInit(): void {
    this.form.query.setValue(this.store.query(), { emitEvent: false });
  }

  protected poster(result: CatalogSearchResult): string | null {
    return tmdbImage(result.posterPath, 'w185');
  }

  protected open(result: CatalogSearchResult): void {
    if (result.type === 'show') {
      void this.#router.navigate(['/shows', result.tmdbId]);
    }
  }

  protected addToWatchlist(result: CatalogSearchResult): void {
    this.#trackMovie.execute(result.tmdbId, false);
  }
}
