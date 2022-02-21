import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { Modal } from '../../modal.service';
import { Modalconfig } from '../../modalconfig.model';
@Component({
  selector: 'tt-modal-maincomponent',
  template: `<button tt-btn-primary (click)="open()">
    Open Component Modal
  </button>`,
})
export class ModalMainComponent {
  @Input() modalData: Modalconfig = {};
  @Output()
  modalClose = new EventEmitter();
  constructor(private modal: Modal) {}
  open(): void {
    const ref = this.modal.open(ModalComponent, this.modalData);
    ref.afterClosed.subscribe(() => {
      this.modalClose.emit();
    });
  }
}

@Component({
  selector: 'tt-modal-prompt',
  template: `<button tt-btn-outline (click)="open(tmpl)">Open Prompt</button>
    <ng-template #tmpl>
      <tt-modal-content>
        <p>Are you sure want to Delete?</p>
      </tt-modal-content>
      <tt-modal-actions>
        <button tt-btn-ghost tt-modal-close class="mr-1">Close</button>
        <button tt-btn-warning class="mr-1">Delete</button>
      </tt-modal-actions>
    </ng-template> `,
})
export class PromptComponent {
  @Input() modalData: Modalconfig = {};
  @Output()
  modalClose = new EventEmitter();
  constructor(private modal: Modal) {}
  open(templateRef: TemplateRef<any>): void {
    const ref = this.modal.open(templateRef, this.modalData);
    ref.afterClosed.subscribe(() => {
      this.modalClose.emit();
    });
  }
}

@Component({
  selector: 'tt-modal-component',
  templateUrl: './modal-component.component.html',
})
export class ModalComponent {}
