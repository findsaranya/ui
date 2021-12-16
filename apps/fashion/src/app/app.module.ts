import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootstrapService } from '@tt-webapp/service';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from '@tt-webapp/shared-components';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { ROOT_REDUCER, ConfigEffects } from '@tt-webapp/service';

function initApplication(bsService: BootstrapService): () => Promise<void> {
  return () => bsService.init(environment);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(
      [
        {
          path: '**',
          component: PageNotFoundComponent,
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    StoreModule.forRoot(ROOT_REDUCER, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([ConfigEffects]),
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
