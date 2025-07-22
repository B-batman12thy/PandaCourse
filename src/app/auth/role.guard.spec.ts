// src/app/auth/role.guard.spec.ts
import { TestBed } from '@angular/core/testing';
import { RoleGuard } from './role.guard';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let auth: AuthService;
  let router: Router;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleGuard, AuthService, { provide: Router, useValue: { navigate: jasmine.createSpy('nav') } }]
    });
    guard  = TestBed.inject(RoleGuard);
    auth   = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    // stub d'un ActivatedRouteSnapshot simulé
    route = new ActivatedRouteSnapshot();
  });

  it('autorise si role inclus dans data.roles', () => {
    route.data = { roles: ['admin'] };
    spyOn(auth, 'getRole').and.returnValue('admin');
    expect(guard.canActivate(route)).toBeTrue();
  });

  it('redirige si role non autorisé', () => {
    route.data = { roles: ['admin'] };
    spyOn(auth, 'getRole').and.returnValue('student');
    expect(guard.canActivate(route)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
