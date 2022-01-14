import { Action, createAction, props } from '@ngrx/store';
import { UserConfig } from './auth.models';

export const initSession = createAction(
  '[Auth] Init Session',
  props<{
    callback?: { success?: Action[]; failure: Action[]; logout: Action[] };
  }>()
);

export const loadSessionSuccess = createAction(
  '[Auth] Load Session Success',
  props<{ sessionToken: string; isRefresh: boolean }>()
);

export const loadSessionFailed = createAction(
  '[Auth] Load Session Failed',
  props<{ error: string | null }>()
);

export const refreshSession = createAction(
  '[Auth] Refresh Session',
  props<{ sessionToken: string }>()
);

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

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const resetSession = createAction('[Auth] Reset Session');
export const logoutFailed = createAction('[Auth] Logout Failed');
