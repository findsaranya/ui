import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ILoginPayload, RefreshTokenResponse, UserConfig } from '.';
import { API_BASE_URL } from '../../injection/tokens';
import { AppState } from '../app.store';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthService {
  constructor(
    @Inject(API_BASE_URL) private apiBaseUrl: string,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  login(credentials: ILoginPayload) {
    return this.http.post(`${this.apiBaseUrl}login`, credentials, {
      observe: 'response',
      withCredentials: true,
    });
  }

  getUserConfig(): Observable<UserConfig> {
    return this.http.get<UserConfig>(`${this.apiBaseUrl}api/secured/user/`);
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    this.stopRefreshTokenTimer();
    return this.http
      .get<RefreshTokenResponse>(`${this.apiBaseUrl}user/refreshtoken`, {
        withCredentials: true,
      })
      .pipe(
        tap((response: RefreshTokenResponse) => {
          localStorage.removeItem('_session');
          localStorage.setItem('_session', response?.accessToken);
          if (response?.accessToken == undefined) {
            this.attemptLogout();
            return;
          }
          this.store.dispatch(
            AuthActions.loadSessionSuccess({ token: response?.accessToken })
          );
          this.startRefreshTokenTimer();
        })
      );
  }

  attemptLogout() {
    // Todo
  }

  startRefreshTokenTimer(): void {
    // Todo
  }

  stopRefreshTokenTimer(): void {
    // Todo
  }
}
