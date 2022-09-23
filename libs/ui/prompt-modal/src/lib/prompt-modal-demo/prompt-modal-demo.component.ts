import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal, Modalconfig } from '@findsaranya/ui/modal';

import {
  IPromptModel,
  PromptModalComponent,
} from '../prompt-modal/prompt-modal.component';

@Component({
  selector: 'tt-prompt-modal-demo',
  template: `
    <button tt-btn-primary size="lg" (click)="open()">{{ buttonName }}</button>
  `,
})
export class PromptModalDemoComponent {
  @Input() buttonName!: string;
  @Input() modalData!: Modalconfig<IPromptModel>;
  @Output()
  actionDone = new EventEmitter<unknown>();
  constructor(private modal: Modal) {}
  open(): void {
    const ref = this.modal.open(PromptModalComponent, this.modalData);
    ref.afterClosed.subscribe((ref: unknown) => {
      this.actionDone.emit(ref);
    });
  }
}
