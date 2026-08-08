import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
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
        logout.execute();
        void router.navigateByUrl('/login');
      }
      return throwError(() => error);
    }),
  );
};
