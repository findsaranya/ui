import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
export type DialogRole = 'dialog' | 'alertdialog';
export class Modalconfig<D = any> {
  viewContainerRef?: ViewContainerRef;
  panelClass?: string | string[] = [
    'flex',
    'flex-col',
    'bg-white-default',
    'shadow-xl',
    'rounded-xl',
  ];
  id?: string;
  hasBackdrop?: boolean = true;
  backdropClass?: string | string[] = 'bg-black-default/50';
  disableClose?: boolean = false;
  width?: string = '';
  height?: string = '';
  data?: D | null = null;
  role?: DialogRole = 'dialog';
  maxWidth?: string = '80vw';
  componentFactoryResolver?: ComponentFactoryResolver;
}
