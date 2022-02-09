import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  BootstrapService,
  SupportChatService,
  TokenInterceptor,
} from '@tt-webapp/service';
import { AppConfig, API_BASE_URL, Auth } from '@tt-webapp/service';
import { environment } from '../../environments/environment';

function initApplication(bsService: BootstrapService): () => Promise<void> {
  return () => bsService.init();
}

@NgModule({
  providers: [
    BootstrapService,
    Auth.AuthService,
    SupportChatService,
    AppConfig.ConfigService,
    {
      provide: API_BASE_URL,
      useValue: environment.API_BASE_URL,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [BootstrapService],
    },
  ],
})
export class CoreModule {}
