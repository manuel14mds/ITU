import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '../auth/auth.service';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  return authService.authUser$.pipe(
    map((user) => {
      return user ? true : router.createUrlTree(['/auth'])
    })
  )
}
