import { InjectionToken } from '@angular/core';
import { IFreshChat } from '../chat-service/support-chat.model';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const CHAT_SERVICE_CONFIG = new InjectionToken<IFreshChat>(
  'CHAT_SERVICE_CONFIG'
);
export const STATIC_BASE_URL = new InjectionToken('STATIC_BASE_URL');
