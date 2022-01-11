import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RefreshTokenResponse, UserConfig } from '.';
import { API_BASE_URL } from '../../injection/tokens';

@Injectable()
export class AuthService {
  constructor(
    @Inject(API_BASE_URL) private apiBaseUrl: string,
    private http: HttpClient
  ) {}

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
