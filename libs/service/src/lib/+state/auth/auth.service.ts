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
    return this.http
      .get<RefreshTokenResponse>(`${this.apiBaseUrl}user/refreshtoken`, {
        withCredentials: true,
      })
      .pipe(
        tap((response: RefreshTokenResponse) => {
          this.store.dispatch(
            AuthActions.refreshSession({ sessionToken: response.accessToken })
          );
        })
      );
  }

  logout() {
    return this.http.post(
      `${this.apiBaseUrl}logout`,
      {},
      { withCredentials: true }
    );
  }
}
