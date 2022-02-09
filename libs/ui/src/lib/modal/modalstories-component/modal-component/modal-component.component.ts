import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { Modal, TT_MODAL_DATA } from '../../modal.service';
import { Modalconfig } from '../../modalconfig';
import { ModalRef } from '../../modalref';

@Component({
  selector: 'tt-modal-maincomponent',
  template: `<button tt-btn-primary (click)="open()">
    Open Component Modal
  </button>`,
})
export class ModalMainComponent {
  @Input() modalData: Modalconfig = {};
  @Output()
  modalClose = new EventEmitter<string>();
  constructor(private modal: Modal) {}
  open() {
    const ref = this.modal.open(ModalComponent, this.modalData);
    ref.afterClosed$.subscribe(() => {
      this.modalClose.emit('Modal Closed');
    });
  }
}

@Component({
  selector: 'tt-modal-prompt',
  template: `<button tt-btn-secondary (click)="open(tpl)">Open Prompt</button>
    <ng-template #tpl>
      <tt-modal-content>
        <p>Are you sure want to Delete?</p>
      </tt-modal-content>
      <tt-modal-actions>
        <button tt-btn-ghost tt-modal-close>Close</button>
        <button tt-btn-warning>Delete</button>
      </tt-modal-actions>
    </ng-template> `,
})
export class PromptComponent {
  constructor(private modal: Modal) {}
  @Input() modalData: Modalconfig = {};
  @Output()
  modalClose = new EventEmitter<string>();

  open(templateRef: TemplateRef<any>) {
    const ref = this.modal.open(templateRef, this.modalData);
    ref.afterClosed$.subscribe(() => {
      this.modalClose.emit('Modal Closed');
    });
  }
}

@Component({
  selector: 'tt-modal-component',
  templateUrl: './modal-component.component.html',
  styles: [],
})
export class ModalComponent {
  constructor(
    private modalRef: ModalRef,
    @Inject(TT_MODAL_DATA) public data: any
  ) {}
}
