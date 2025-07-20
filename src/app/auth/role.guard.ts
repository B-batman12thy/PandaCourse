import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[] || [];
    const userRole = this.auth.getRole();
    if (requiredRoles.includes(userRole!)) {
      return true;
    }
    // Option : rediriger vers une page “403”
    this.router.navigate(['/login']);
    return false;
  }
}
