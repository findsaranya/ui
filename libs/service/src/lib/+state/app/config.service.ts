import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IApplicationConfigResponce, ISideNavigationResponse } from '.';
import { API_BASE_URL } from '../../injection/tokens';
import { sideNavSampleData } from './config.data';

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

  getNavigationData(): Observable<ISideNavigationResponse> {
    const resp: ISideNavigationResponse = {
      data: sideNavSampleData,
      message: '',
    };

    return of(resp);
  }
}
