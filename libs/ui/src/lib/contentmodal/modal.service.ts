import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
} from '@angular/core';
import { Modalconfig } from './modalconfig';
import { ModalRef } from './modalref';
export const TT_MODAL_DEFAULT_OPTIONS = new InjectionToken<Modalconfig>(
  'tt-modal-default-options'
);

export const TT_MODAL_DATA = new InjectionToken<any>('ModalData');
@Injectable()
export class Modal {
  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Optional()
    @Inject(TT_MODAL_DEFAULT_OPTIONS)
    private _defaultOptions: Modalconfig
  ) {
    console.log('default options', _defaultOptions);
  }

  open<T, D, R>(
    component: ComponentType<T>,
    config?: Modalconfig<D>
  ): ModalRef<T, R> {
    const modalConfig = applyConfigDefaults(
      config,
      this._defaultOptions || new Modalconfig()
    );
    console.log('config', modalConfig);
    const overlayRef = this.createOverlay(modalConfig);
    const dialogRef = new ModalRef(overlayRef);

    const overlayComponent = this.attachModalContainer<T>(
      overlayRef,
      modalConfig,
      dialogRef,
      component
    );

    //this.dialogRef = dialogRef;
    return dialogRef;
  }
  private attachModalContainer<T>(
    overlayRef: OverlayRef,
    config: Modalconfig,
    dialogRef: ModalRef<T>,
    component: ComponentType<T>
  ) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<T> = overlayRef.attach(containerPortal);
    console.log('container ref ', containerRef);
    return containerRef.instance;
  }

  private createInjector<T>(
    config: Modalconfig,
    dialogRef: ModalRef<T>
  ): Injector {
    // const injectionTokens = new WeakMap();

    // injectionTokens.set(CompoRef, dialogRef);

    // return new PortalInjector(this._injector, injectionTokens);
    const injector = Injector.create({
      parent: this._injector,
      providers: [
        { provide: ModalRef, useValue: dialogRef },
        { provide: TT_MODAL_DATA, useValue: config?.data },
      ],
    });
    console.log('injector', dialogRef);
    return injector;
  }

  private getOverlayConfig(config: Modalconfig): OverlayConfig {
    const positionStrategy = this._overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      width: config.width,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }

  private createOverlay(config: Modalconfig) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig(config);

    // Returns an OverlayRef
    return this._overlay.create(overlayConfig);
  }
}
function applyConfigDefaults(
  config?: Modalconfig,
  defaultOptions?: Modalconfig
): Modalconfig {
  return { ...defaultOptions, ...config };
}
