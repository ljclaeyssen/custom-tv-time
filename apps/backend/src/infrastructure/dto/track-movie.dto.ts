import { IsBoolean, IsOptional } from 'class-validator';

export class TrackMovieDto {
  @IsOptional()
  @IsBoolean()
  watched?: boolean;
}

export class SetMovieWatchedDto {
  @IsBoolean()
  watched: boolean;
}
