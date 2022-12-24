import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
