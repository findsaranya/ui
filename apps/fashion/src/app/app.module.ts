import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  ROOT_REDUCER,
  AppConfig,
  Auth,
  WildcardAuthGuard,
} from '@tt-webapp/service';
import { CoreModule } from './core.module';
import { environment } from '../environments/environment';

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
        canActivate: [WildcardAuthGuard],
      },
    ]),
    StoreModule.forRoot(ROOT_REDUCER, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([AppConfig.ConfigEffects, Auth.AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
