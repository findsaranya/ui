import { FocusOrigin } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import {
  ModalContainerBaseComponent,
  ModalContainerComponent,
} from './modal-container.component';
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
  afterClosed$ = new Subject<R | undefined>();
  constructor(
    private _overlayRef: OverlayRef,
    public containerInstance: ModalContainerComponent,
    readonly id: string = `tt-modal-${uid()}`
  ) {
    _overlayRef.backdropClick().subscribe(() => {
      if (!this.disableClose) {
        this.closeModalVia('mouse');
      }
      containerInstance.id = id;
    });
  }

  close(modalResult?: R): void {
    this._result = modalResult;
    this._overlayRef.dispose();
    this.afterClosed$.next(modalResult);
    this.afterClosed$.complete();
    this.state = TTModalState.CLOSED;
  }

  private closeModalVia(interactionType: FocusOrigin, result?: R): void {
    this.close(result);
  }
}
