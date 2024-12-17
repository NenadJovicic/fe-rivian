import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export async function isLoggedInGuard(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isLoggedIn = await authService.isLoggedIn();
  if (!isLoggedIn) {
    return router.navigate(['login']);
  }
  return true;
}
