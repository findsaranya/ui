import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Optional,
} from '@angular/core';
import { ContainerModalRef, Modal } from './modal.service';
import { closeModalVia, ModalRef } from './modalref';

@Directive({
  selector: '[modal-title]',
})
export class ModaTitleDirective {
  constructor(
    @Optional() private _dialogRef: ModalRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialog: Modal
  ) {}
  @HostBinding('class') get class(): string {
    return 'ttui-modal-title';
  }
}

@Directive({
  selector: `[tt-modal-content], tt-modal-content`,
})
export class ModalContentDirective {
  @HostBinding('class') get class(): string {
    return 'ttui-modal-content';
  }
}

@Directive({
  selector: `[tt-modal-actions], tt-modal-actions`,
})
export class ModalActionsDirective {
  @HostBinding('class') get class(): string {
    return 'ttui-modal-actions';
  }
}

@Directive({
  selector: '[tt-modal-close], [ttModalClose]',
  exportAs: 'ttmodalClose',
})
export class ModaCloseDirective implements OnInit {
  constructor(
    @Optional() private _dialogRef: ModalRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialog: Modal
  ) {}
  ngOnInit(): void {
    if (!this._dialogRef) {
      const dialogRef = getClosestDialog(
        this._elementRef,
        this._dialog.openModals
      );
      this._dialogRef = dialogRef?.modalRef as ModalRef;
    }
  }
  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    closeModalVia(
      this._dialogRef,
      event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse'
    );
  }
}
function getClosestDialog(
  element: ElementRef<HTMLElement>,
  openDialogs?: ContainerModalRef[]
): ContainerModalRef | undefined | null {
  let parent: HTMLElement | null = element.nativeElement.parentElement;
  while (parent && !parent.classList.contains('ttui-modal-container')) {
    parent = parent.parentElement;
  }
  return parent
    ? openDialogs?.find(({ container }) => container.id === parent?.id)
    : null;
}
