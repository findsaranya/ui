import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
export type DialogRole = 'dialog' | 'alertdialog';
export class Modalconfig<D = any> {
  viewContainerRef?: ViewContainerRef;
  panelClass: string | string[] = [];
  id?: string;
  hasBackdrop = true;
  backdropClass: string | string[] = 'bg-black-default/50';
  disableClose = false;
  width = '';
  height = '';
  data: D | null = null;
  role: DialogRole = 'dialog';
  maxWidth = '80vw';
  componentFactoryResolver?: ComponentFactoryResolver;
}
