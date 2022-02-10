import { FocusOrigin } from '@angular/cdk/a11y';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  Component,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostBinding,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Modalconfig } from './modalconfig.model';
import { v4 as uid } from 'uuid';

@Directive()
export abstract class ModalContainerBaseComponent extends BasePortalOutlet {
  closeInteractionType: FocusOrigin | null = null;
  @ViewChild(CdkPortalOutlet, { static: true })
  portalOutlet!: CdkPortalOutlet;
  readonly id: string = `ttui-modal-container-${uid()}`;
  constructor(
    _elementRef: ElementRef,
    _config: Modalconfig,
    viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throw new Error('Already attached');
    }
    return this.portalOutlet.attachComponentPortal(portal);
  }
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.portalOutlet.hasAttached()) {
      throw new Error('Already attached');
    }

    return this.portalOutlet.attachTemplatePortal(portal);
  }
}
@Component({
  selector: 'tt-modal-container',
  template: ` <ng-template cdkPortalOutlet></ng-template> `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent extends ModalContainerBaseComponent {
  @HostBinding('attr.id') get Id() {
    return this.id ? this.id : null;
  }
  @HostBinding('class') get class(): string {
    return 'ttui-modal-container';
  }
  constructor(
    private elementRef: ElementRef,
    public config: Modalconfig,
    public viewContainerRef: ViewContainerRef
  ) {
    super(elementRef, config, viewContainerRef);
    console.log('cdk container', this.id);
  }
}
