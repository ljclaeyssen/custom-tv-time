import { catchError, EMPTY, first, Observable, tap } from 'rxjs';

/**
 * Pipeline commun des use-cases de lecture : première émission écrite dans
 * le store, et repli optionnel en cas d'erreur (typiquement couper le
 * loading pour ne pas bloquer les squelettes).
 */
export function runQuery<T>(
  source: Observable<T>,
  sinks: { onResult: (value: T) => void; onError?: () => void },
): void {
  source
    .pipe(
      first(),
      tap(sinks.onResult),
      catchError(() => {
        sinks.onError?.();
        return EMPTY;
      }),
    )
    .subscribe();
}
