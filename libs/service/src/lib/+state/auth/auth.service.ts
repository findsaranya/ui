import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserConfig } from '.';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUserConfig(apiHost: string): Observable<UserConfig> {
    return this.http.get<UserConfig>(`${apiHost}api/secured/user/`, {
      headers: new HttpHeaders({
        'X-token': localStorage.getItem('_session') || '',
      }),
    });
  }
}
