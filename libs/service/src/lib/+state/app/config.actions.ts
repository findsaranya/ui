import { createAction, props } from '@ngrx/store';
import { ConfigEntity } from './config.models';

export const init = createAction('[Config Page] Init');

export const loadConfigSuccess = createAction(
  '[Config/API] Load Config Success',
  props<{ config: ConfigEntity[] }>()
);

export const loadConfigFailure = createAction(
  '[Config/API] Load Config Failure',
  props<{ error: any }>()
);
