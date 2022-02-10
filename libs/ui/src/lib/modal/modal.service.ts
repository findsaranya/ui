import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Optional,
  SkipSelf,
  StaticProvider,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {
  ModalContainerBaseComponent,
  ModalContainerComponent,
} from './modal-container.component';
import { Modalconfig } from './modalconfig.model';
import { ModalRef } from './modalref';
export const TT_MODAL_DEFAULT_OPTIONS = new InjectionToken<Modalconfig>(
  'tt-modal-default-options'
);

export const TT_MODAL_DATA = new InjectionToken<any>('ModalData');
export interface ContainerModalRef {
  container: ModalContainerBaseComponent;
  modalRef: ModalRef<any>;
}

@Injectable()
export class ViewContainerService {
  public viewContainerRef?: ViewContainerRef;

  set viewPortalRef(vcr: ViewContainerRef) {
    console.log('service');
    this.viewContainerRef = vcr;
  }
}
@Directive()
export abstract class ModalBase<C extends ModalContainerBaseComponent> {
  private _openDialogsAtThisLevel: ContainerModalRef[] = [];
  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    private _defaultOptions: Modalconfig,
    private _parentDialog: ModalBase<C> | undefined,
    private _overlayContainer: OverlayContainer,
    private _dialogRefConstructor: Type<ModalRef<any>>,
    private _dialogContainerType: Type<C>,
    private _dialogDataToken: InjectionToken<any>
  ) {}

  get openModals(): ContainerModalRef[] {
    return this._parentDialog
      ? this._parentDialog.openModals
      : this._openDialogsAtThisLevel;
  }
  open<T, D, R>(
    component: ComponentType<T>,
    config?: Modalconfig<D>
  ): ModalRef<T, R>;

  open<T, D, R>(
    template: TemplateRef<T>,
    config?: Modalconfig<D>
  ): ModalRef<T, R>;

  open<T, D, R>(
    template: ComponentType<T> | TemplateRef<T>,
    config?: Modalconfig<D>
  ): ModalRef<T, R>;
  open<T, D, R>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: Modalconfig<D>
  ): ModalRef<T, R> {
    const modalConfig = this.applyConfigDefaults(
      config,
      this._defaultOptions || new Modalconfig()
    );
    const overlayRef = this.createOverlay(modalConfig as Modalconfig);
    const dialogContainer = this.attachModalContainer<T>(
      overlayRef,
      modalConfig as Modalconfig
    );
    const dialogRef = this.attachDialogContent<T, R>(
      componentOrTemplateRef,
      dialogContainer,
      overlayRef,
      modalConfig as Modalconfig
    );
    this.openModals.push({
      container: dialogContainer,
      modalRef: dialogRef,
    });
    return dialogRef;
  }
  private attachModalContainer<T>(
    overlayRef: OverlayRef,
    config: Modalconfig
  ): C {
    const injector = Injector.create({
      parent: this._injector,
      providers: [{ provide: Modalconfig, useValue: config }],
    });

    const containerPortal = new ComponentPortal(
      this._dialogContainerType,
      config.viewContainerRef,
      injector,
      config.componentFactoryResolver
    );

    const containerRef = overlayRef.attach<C>(containerPortal);
    return containerRef.instance;
  }

  private createInjector<T>(
    config: Modalconfig,
    dialogRef: ModalRef<T>,
    dialogContainer?: C
  ): Injector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const providers: StaticProvider[] = [
      { provide: this._dialogContainerType, useValue: dialogContainer },
      { provide: this._dialogDataToken, useValue: config.data },
      { provide: this._dialogRefConstructor, useValue: dialogRef },
    ];
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers,
    });

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
      maxWidth: config.maxWidth,
      height: config.height,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }

  private createOverlay(config: Modalconfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }

  private attachDialogContent<T, R>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    dialogContainer: C | undefined,
    overlayRef: OverlayRef,
    config: Modalconfig
  ): ModalRef<T, R> {
    const dialogRef = new this._dialogRefConstructor(
      overlayRef,
      dialogContainer,
      config.id
    );

    if (componentOrTemplateRef instanceof TemplateRef) {
      dialogContainer?.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, {
          $implicit: config.data,
          dialogRef,
        } as any)
      );
    } else {
      const injector = this.createInjector<T>(
        config,
        dialogRef,
        dialogContainer
      );
      const contentRef = dialogContainer?.attachComponentPortal<T>(
        new ComponentPortal(
          componentOrTemplateRef as ComponentType<T>,
          config.viewContainerRef,
          injector
        )
      );
      dialogRef.componentInstance = contentRef?.instance;
    }

    return dialogRef;
  }
  private applyConfigDefaults(
    config?: Modalconfig,
    defaultOptions?: Modalconfig
  ): Partial<Modalconfig> {
    return { ...defaultOptions, ...config };
  }
}
@Injectable()
export class Modal extends ModalBase<ModalContainerComponent> {
  constructor(
    overlay: Overlay,
    injector: Injector,
    @Optional()
    @Inject(TT_MODAL_DEFAULT_OPTIONS)
    private defaultOptions: Modalconfig,
    @Optional() @SkipSelf() parentDialog: Modal,
    overlayContainer: OverlayContainer
  ) {
    super(
      overlay,
      injector,
      defaultOptions,
      parentDialog,
      overlayContainer,
      ModalRef,
      ModalContainerComponent,
      TT_MODAL_DATA
    );
  }
}
