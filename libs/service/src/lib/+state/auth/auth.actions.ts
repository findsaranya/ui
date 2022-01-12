import { Action, createAction, props } from '@ngrx/store';
import { UserConfig } from './auth.models';

export const initSession = createAction(
  '[Auth] Init Session',
  props<{
    callback?: { success?: Action[]; failure: Action[] };
  }>()
);

export const loadSessionSuccess = createAction(
  '[Auth] Load Session Success',
  props<{ token: string }>()
);

export const loadSessionFailed = createAction('[Auth] No active sessions');

export const initUserConfig = createAction('[Auth] Init User config');

export const userConfigLoadSuccess = createAction(
  '[Auth] User Config Load Success',
  props<{ data: UserConfig }>()
);

export const userConfigLoadFailed = createAction(
  '[Auth] User Config Load Failed',
  props<{ error: string }>()
);

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ sessionToken: string }>()
);
export const loginError = createAction(
  '[Auth] Login Error',
  props<{ error: string }>()
);
