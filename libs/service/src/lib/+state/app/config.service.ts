import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IApplicationConfigResponce, INavigationResponse } from '.';
import { API_BASE_URL } from '../../injection/tokens';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(API_BASE_URL) private apiBaseUrl: string,
    private http: HttpClient
  ) {}

  applicationConfig(): Observable<IApplicationConfigResponce> {
    return this.http.get<IApplicationConfigResponce>(
      `${this.apiBaseUrl}ui/app-config`
    );
  }
  applicationConfigWithAuth(): Observable<IApplicationConfigResponce> {
    return this.http.get<IApplicationConfigResponce>(
      `${this.apiBaseUrl}api/ui/app-config`
    );
  }

  getNavigationData(): Observable<INavigationResponse> {
    return this.http.get<INavigationResponse>(`${this.apiBaseUrl}api/ui/menus`);
  }

  updateNavigationPinState(collapsed: boolean): Observable<unknown> {
    return this.http.patch(`${this.apiBaseUrl}api/ui/navigation`, {
      collapsed,
    });
  }
}
