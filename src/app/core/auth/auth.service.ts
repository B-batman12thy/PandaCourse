import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser }               from '@angular/common';
import { BehaviorSubject, Observable }     from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private roleKey  = 'auth_role';

  // on initialise d'abord sans appeler localStorage
  private _loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._loggedIn.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // une fois qu'on est constructeur, on peut tester le platform
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.tokenKey);
      this._loggedIn.next(!!token);
    }
  }

  login(username: string, password: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const fakeToken = 'JWT-TOKEN-123';
    const fakeRole  = username === 'admin' ? 'admin' : 'student';

    localStorage.setItem(this.tokenKey, fakeToken);
    localStorage.setItem(this.roleKey, fakeRole);
    this._loggedIn.next(true);
    return true;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.roleKey);
    }
    this._loggedIn.next(false);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.roleKey);
    }
    return null;
  }
  get isLoggedIn(): boolean {
    return this._loggedIn.getValue();
  }
}
