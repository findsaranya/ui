import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IApplicationConfigResponce } from '.';
import { API_BASE_URL } from '../../injection/tokens';
import { apiBaseUrl, apps, appsWithAuth } from './config.data';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConfigService,
        { provide: API_BASE_URL, useValue: apiBaseUrl },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConfigService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return application config [Without Auth]', (done) => {
    const appConfigMock: IApplicationConfigResponce = {
      data: apps,
    };
    service.applicationConfig().subscribe((config) => {
      expect(config.data.length).toEqual(1);
      expect(config.data.every((d) => d.subscribed === false)).toBeTruthy();
      expect(config.data[0].id).toEqual('AUTH');
      done();
    });

    const req = httpTestingController.expectOne(apiBaseUrl + 'ui/app-config');
    expect(req.request.method).toEqual('GET');

    req.flush(appConfigMock);
  });
  it('should return application config [With Auth] ', (done) => {
    const appConfigMock: IApplicationConfigResponce = {
      data: appsWithAuth,
    };
    service.applicationConfigWithAuth().subscribe((config) => {
      expect(config.data.length).toEqual(3);
      expect(config.data[0].id).toEqual('AUTH');
      done();
    });

    const req = httpTestingController.expectOne(
      apiBaseUrl + 'api/ui/app-config'
    );
    expect(req.request.method).toEqual('GET');

    req.flush(appConfigMock);
  });

  // ToDo
  // it('should return navigation config', (done) => {
  // const appConfigMock: INavigationResponse = {
  //   data: sideNavSampleData,
  //   message: '',
  // };
  // service.getNavigationData().subscribe((config) => {
  //   expect(config.data.collapsed).toBeTruthy();
  //   expect(config.data.menus.bottomOrder.length).toEqual(6);
  //   done();
  // });

  // const req = httpTestingController.expectOne(apiBaseUrl + 'api/navigation');
  // expect(req.request.method).toEqual('GET');

  // req.flush(appConfigMock);
  // });

  it('should patch navigation pin state ', (done) => {
    service.updateNavigationPinState(false).subscribe((config) => {
      expect(config).not.toBeUndefined();
      done();
    });
    const req = httpTestingController.expectOne(
      apiBaseUrl + 'api/ui/navigation'
    );
    expect(req.request.method).toEqual('PATCH');
    req.flush({});
  });
});
