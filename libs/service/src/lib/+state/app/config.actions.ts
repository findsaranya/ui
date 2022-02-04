import { createAction, props } from '@ngrx/store';
import { IMicroFrontendConfig, INavigation } from './config.models';

export const initApplicationConfig = createAction(
  '[Config] Init Application Config'
);
export const initApplicationConfigWithAuth = createAction(
  '[Config] Init Application Config With Authentication'
);

export const loadConfigSuccess = createAction(
  '[Config/API] Load Config Success',
  props<{
    appConfig: IMicroFrontendConfig[];
    navigationConfig: INavigation | null;
  }>()
);

export const loadConfigFailure = createAction(
  '[Config/API] Load Config Failure',
  props<{ error: string }>()
);
