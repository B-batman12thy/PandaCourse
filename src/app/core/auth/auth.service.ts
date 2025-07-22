// src/app/core/auth/auth.service.ts
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Platform ID obtained via inject()
  private platformId = inject(PLATFORM_ID);

  private tokenKey = 'auth_token';
  private roleKey = 'auth_role';

  // Initialise l'état de connexion sans accéder à localStorage
  private _loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._loggedIn.asObservable();

  constructor() {
    // Vérifie localStorage côté client
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.tokenKey);
      this._loggedIn.next(!!token);
    }
  }

  /**
   * Simule une connexion et stocke un token et rôle factices
   */
  login(username: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const fakeToken = 'JWT-TOKEN-123';
    const fakeRole = username === 'admin' ? 'admin' : 'student';

    localStorage.setItem(this.tokenKey, fakeToken);
    localStorage.setItem(this.roleKey, fakeRole);
    this._loggedIn.next(true);
    return true;
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.roleKey);
    }
    this._loggedIn.next(false);
  }

  /**
   * Récupère le token en localStorage
   */
  getToken(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(this.tokenKey)
      : null;
  }

  /**
   * Récupère le rôle en localStorage
   */
  getRole(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem(this.roleKey)
      : null;
  }

  /**
   * Indique si l'utilisateur est connecté
   */
  get isLoggedIn(): boolean {
    return this._loggedIn.getValue();
  }
}