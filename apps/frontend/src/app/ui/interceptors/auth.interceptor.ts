import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AuthStore } from '../../store/auth.store';
import { Logout } from '../../use-cases/logout';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const store = inject(AuthStore);
  const logout = inject(Logout);
  const router = inject(Router);

  const token = store.token();
  const authenticated = token
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;

  return next(authenticated).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Session expirée : entièrement gérée ici (déconnexion + retour login).
        // L'erreur est absorbée pour que les use-cases ne toastent pas un faux
        // « Impossible de charger… » par-dessus l'écran de connexion.
        logout.execute();
        void router.navigateByUrl('/login');
        return EMPTY;
      }
      return throwError(() => error);
    }),
  );
};
