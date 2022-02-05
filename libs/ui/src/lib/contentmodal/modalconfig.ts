import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

export class Modalconfig<D = any> {
  viewContainerRef?: ViewContainerRef;
  panelClass?: string | string[] = [
    'p-5',
    'flex',
    'flex-col',
    'bg-white-default',
    'shadow-xl',
    'rounded-xl',
  ];
  hasBackdrop?: boolean = true;
  backdropClass?: string | string[] = 'bg-black-default/50';
  disableClose?: boolean = false;
  width?: string = '';
  height?: string = '';
  data?: D | null = null;
  componentFactoryResolver?: ComponentFactoryResolver;
}
