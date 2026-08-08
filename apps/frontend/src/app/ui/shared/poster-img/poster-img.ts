import { Component, input } from '@angular/core';

/**
 * Image de poster avec placeholder — remplit le conteneur (figure, lien…)
 * grâce à `display: contents`. Taille de l'icône ajustable via la variable
 * CSS `--poster-icon-size` posée sur le conteneur.
 */
@Component({
  selector: 'app-poster-img',
  imports: [],
  templateUrl: './poster-img.html',
  styleUrl: './poster-img.scss',
})
export class PosterImg {
  readonly src = input.required<string | null>();
  readonly alt = input.required<string>();
}
