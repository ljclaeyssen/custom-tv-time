import type { CatalogEpisode, CatalogShowDetail } from '@ctt/shared-models';

export { FollowStatus } from '@ctt/shared-models';
export type {
  FollowedShow,
  EpisodeWithState,
  WatchNextItem,
  MyShowItem,
  SeasonProgress,
  ShowProgress,
} from '@ctt/shared-models';

export type Episode = CatalogEpisode;
export type ShowDetail = CatalogShowDetail;
