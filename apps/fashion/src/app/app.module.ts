import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootstrapService } from '@tt-webapp/service';
import { environment } from '../environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { ROOT_REDUCER, ConfigEffects, AuthEffects } from '@tt-webapp/service';
import { HttpClientModule } from '@angular/common/http';

function initApplication(bsService: BootstrapService): () => Promise<void> {
  return () => bsService.init(environment);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'error',
        loadChildren: () =>
          import('@tt-webapp/ui').then((m) => m.FailedToLoadApplicationModule),
      },
      {
        path: '**',
        loadChildren: () =>
          import('@tt-webapp/ui').then((m) => m.PageNotFoundModule),
      },
    ]),
    StoreModule.forRoot(ROOT_REDUCER, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([ConfigEffects, AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    BootstrapService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [BootstrapService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
