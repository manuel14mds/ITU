/* import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../auth/auth.service';

export const publicGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    const authService = inject(AuthService)

    return authService.authUser$.pipe(
        map((user) => {
            return user ? router.createUrlTree(['/dashboard']) : false
        })
    )
}

 */

import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';

export const publicGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.authUser$.pipe(
    map((user) => {
      return !user ? true : router.createUrlTree(['/dashboard']);
    })
  );
};