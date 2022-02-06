import { Component, Inject } from '@angular/core';
import { ModalRef, TT_MODAL_DATA } from '@tt-webapp/ui';

@Component({
  selector: 'tt-test',
  template: `
    <p>test works!</p>
    <button tt-btn-secondary (click)="close()">close</button>
  `,
  styles: [],
})
export class TestComponent {
  constructor(
    private modalRef: ModalRef<TestComponent>,
    @Inject(TT_MODAL_DATA) public data: any
  ) {}
  close() {
    console.log('data', this.data);
    this.modalRef.close();
  }
}
