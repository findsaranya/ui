import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './+state/auth/auth.reducer';
import { AuthEffects } from './+state/auth/auth.effects';
import * as fromConfig from './+state/app/config.reducer';
import { ConfigEffects } from './+state/app/config.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(fromConfig.CONFIG_FEATURE_KEY, fromConfig.reducer),
    EffectsModule.forFeature([ConfigEffects]),
  ],
})
export class ServiceModule {}
