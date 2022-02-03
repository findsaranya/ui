import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

export class Modalconfig<D = any> {
  viewContainerRef?: ViewContainerRef;
  panelClass?: string | string[] = '';
  hasBackdrop?: boolean = true;
  backdropClass?: string | string[] = '';
  disableClose?: boolean = false;
  width?: string = '';
  height?: string = '';
  data?: D | null = null;
  componentFactoryResolver?: ComponentFactoryResolver;
}
