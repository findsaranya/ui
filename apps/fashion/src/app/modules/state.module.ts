import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppConfig, Auth, ROOT_REDUCER } from '@tt-webapp/service';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    StoreModule.forRoot(ROOT_REDUCER, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([AppConfig.ConfigEffects, Auth.AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [],
})
export class StateModule {}
