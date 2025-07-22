// src/app/core/auth/auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { PLATFORM_ID } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        // forcer PLATFORM_ID à « browser »
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    service = TestBed.inject(AuthService);
    // nettoyer localStorage avant chaque test
    localStorage.clear();
  });

  it('should start logged out if no token', () => {
    expect(service.isLoggedIn$).toBeInstanceOf(Object);
    service.isLoggedIn$.subscribe((val) => expect(val).toBeFalse());
  });

  it('login() doit stocker token+role et émettre true', () => {
    const ok = service.login('admin', 'pwd');
    expect(ok).toBeTrue();
    expect(localStorage.getItem('auth_token')).toBe('JWT-TOKEN-123');
    expect(localStorage.getItem('auth_role')).toBe('admin');
    expect(service.getRole()).toBe('admin');
    service.isLoggedIn$.subscribe((val) => expect(val).toBeTrue());
  });

  it('logout() doit vider storage et émettre false', () => {
    // se logger d’abord
    service.login('user', 'pwd');
    service.logout();
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(localStorage.getItem('auth_role')).toBeNull();
    service.isLoggedIn$.subscribe((val) => expect(val).toBeFalse());
  });
});
