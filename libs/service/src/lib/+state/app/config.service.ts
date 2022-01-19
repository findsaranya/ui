import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplicationConfigResponce } from '.';
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
}
