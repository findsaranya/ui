import { Action, ActionReducerMap } from '@ngrx/store';
import * as App from './app';

export interface AppState {
  appConfig: App.State;
}

export const ROOT_REDUCER: ActionReducerMap<AppState, Action> = {
  appConfig: App.reducer,
};
