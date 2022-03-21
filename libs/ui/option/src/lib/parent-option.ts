import { InjectionToken } from '@angular/core';
export interface ParentOption {
  multiple?: boolean;
  inertGroups?: boolean;
}

export const OPTION_PARENT = new InjectionToken<ParentOption>('OPTION_PARENT');
