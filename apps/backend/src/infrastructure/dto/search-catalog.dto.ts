import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class SearchCatalogDto {
  @IsString()
  @MinLength(2)
  q: string;

  @IsOptional()
  @IsIn(['show', 'movie', 'all'])
  type?: 'show' | 'movie' | 'all';
}
