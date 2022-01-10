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

export const initUserConfig = createAction(
  '[Auth] Init User config',
  props<{ API_BASE_URL: string }>()
);

export const userConfigLoadSuccess = createAction(
  '[Auth] User Config Load Success',
  props<{ data: UserConfig }>()
);

export const userConfigLoadFailed = createAction(
  '[Auth] User Config Load Failed',
  props<{ error: string }>()
);
