import { createAction, props } from '@ngrx/store';
import { IMicroFrontendConfig } from '../../mfe/mfe.model';

export const init = createAction(
  '[Config] Init',
  props<{ envConfig: { [key in string]: unknown } }>()
);

export const loadConfigSuccess = createAction(
  '[Config/API] Load Config Success',
  props<{ config: IMicroFrontendConfig[] }>()
);

export const loadConfigFailure = createAction(
  '[Config/API] Load Config Failure',
  props<{ error: string }>()
);
