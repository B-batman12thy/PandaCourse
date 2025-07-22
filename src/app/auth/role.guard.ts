import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = (route.data['roles'] as string[]) || [];
    const userRole = this.auth.getRole();
    if (requiredRoles.includes(userRole!)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
