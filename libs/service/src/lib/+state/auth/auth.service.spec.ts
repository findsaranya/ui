import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ILoginFailedResponce, ILoginPayload, LoginPayload } from '.';
import { API_BASE_URL } from '../../injection/tokens';
import { apiBaseUrl } from '../app/config.data';

import { AuthService } from './auth.service';
import { UserConfig } from './auth.data';
describe('AuthService ', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: API_BASE_URL, useValue: apiBaseUrl },
        provideMockStore(),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate login success', (done) => {
    const loginPayload: ILoginPayload = new LoginPayload(
      'admin',
      'admin'
    ).parse();

    service.login(loginPayload).subscribe((response) => {
      expect(response.status).toEqual(200);
      expect(response.headers.get('X-Token')).toEqual('NewJwt');
      expect(response.headers.get('set-cookie')).toEqual('RefreshToken=token');
      done();
    });

    const req = httpTestingController.expectOne(apiBaseUrl + 'login');
    expect(req.request.method).toEqual('POST');

    req.flush('', {
      headers: { 'X-Token': 'NewJwt', 'set-cookie': 'RefreshToken=token' },
    });
  });
  it('should validate login failed', (done) => {
    const loginPayload: ILoginPayload = new LoginPayload(
      'admin',
      'wrongPassword'
    ).parse();

    service.login(loginPayload).subscribe({
      error: (error) => {
        const body = error.error as ILoginFailedResponce;
        expect(error.status).toEqual(401);
        expect(body.message).toEqual('Invalid credentials');
        expect(body.success).toBeFalsy();
        done();
      },
    });

    const req = httpTestingController.expectOne(apiBaseUrl + 'login');
    expect(req.request.method).toEqual('POST');

    const res: ILoginFailedResponce = {
      success: false,
      message: 'Invalid credentials',
    };
    req.flush(res, {
      status: 401,
      statusText: 'failed',
    });
  });

  it('should return user config success response', (done) => {
    const res = UserConfig;
    service.getUserConfig().subscribe((response) => {
      const body = JSON.stringify(response);
      expect(JSON.stringify(UserConfig)).toEqual(body);
      done();
    });

    const req = httpTestingController.expectOne(
      apiBaseUrl + 'api/secured/user/'
    );
    expect(req.request.method).toEqual('GET');

    req.flush(res);
  });

  it('should return user config failed response', (done) => {
    service.getUserConfig().subscribe({
      error: (error) => {
        expect(error.status).toEqual(401);
        done();
      },
    });

    const req = httpTestingController.expectOne(
      apiBaseUrl + 'api/secured/user/'
    );
    expect(req.request.method).toEqual('GET');

    req.flush('', {
      status: 401,
      statusText: 'failed',
    });
  });

  it('should to refresh the token', () => {
    service.refreshToken().subscribe();
    const req = httpTestingController.expectOne(
      apiBaseUrl + 'user/refreshtoken'
    );
    expect(req.request.method).toEqual('GET');
    req.flush('');
  });

  it('should logout', () => {
    service.logout().subscribe();
    const req = httpTestingController.expectOne(apiBaseUrl + 'logout');
    expect(req.request.method).toEqual('POST');
    req.flush('');
  });
});
