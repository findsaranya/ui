import { FocusOrigin } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { ModalContainerComponent } from './modal-container.component';
import { v4 as uid } from 'uuid';
export const enum TTModalState {
  OPEN,
  CLOSED,
}
export class ModalRef<T = any, R = any> {
  private _result: R | undefined;
  get state(): TTModalState {
    return this._state;
  }
  set state(val: TTModalState) {
    this._state = val;
  }
  private _state = TTModalState.OPEN;
  disableClose: boolean | undefined =
    this.containerInstance.config.disableClose;
  componentInstance: T | undefined;
  afterClosed = new Subject<R | undefined>();
  readonly id: string = `ttui-modal-ref-${uid()}`;
  constructor(
    private _overlayRef: OverlayRef,
    public containerInstance: ModalContainerComponent
  ) {
    _overlayRef.backdropClick().subscribe(() => {
      if (!this.disableClose) {
        closeModalVia(this, 'mouse');
      }
    });
  }

  close(modalResult?: R): void {
    this._result = modalResult;
    this._overlayRef.dispose();
    this.afterClosed.next(modalResult);
    this.afterClosed.complete();
    this.state = TTModalState.CLOSED;
  }
}
export function closeModalVia<R>(
  ref: ModalRef<R>,
  interactionType: FocusOrigin,
  result?: R
): void {
  if (ref.containerInstance !== undefined) {
    ref.containerInstance.closeInteractionType = interactionType;
  }
  return ref.close(result);
}
