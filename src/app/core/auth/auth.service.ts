import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private roleKey  = 'auth_role';
  private _loggedIn = new BehaviorSubject<boolean>(!!this.getToken());

  // Observable pour réagir au login/logout
  isLoggedIn$ = this._loggedIn.asObservable();

  // Simule un login, stocke token + rôle
  login(username: string, password: string): boolean {
    // TODO : appeler un vrai endpoint
    const fakeToken = 'JWT-TOKEN-123';
    const fakeRole  = username === 'admin' ? 'admin' : 'student';

    localStorage.setItem(this.tokenKey, fakeToken);
    localStorage.setItem(this.roleKey, fakeRole);
    this._loggedIn.next(true);
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this._loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  get isLoggedIn(): boolean {
    return this._loggedIn.value;
  }
}
