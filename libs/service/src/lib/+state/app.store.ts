import { Action, ActionReducerMap } from '@ngrx/store';
import * as App from './app';
import * as Auth from './auth';
export interface AppState {
  appConfig: App.State;
  auth: Auth.State;
}

export const ROOT_REDUCER: ActionReducerMap<AppState, Action> = {
  appConfig: App.reducer,
  auth: Auth.reducer,
};
