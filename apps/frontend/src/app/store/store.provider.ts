import { Provider } from '@angular/core';

// Les stores sont fournis en root via @Injectable({ providedIn: 'root' }).
// Ce provider existe pour garder un point d'enregistrement homogène par couche.
export function provideApplicationStore(): Provider[] {
  return [];
}
