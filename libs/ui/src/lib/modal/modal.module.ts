import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { Modal } from './modal.service';
import { ModalContainerComponent } from './modal-container.component';
import {
  ModaTitleDirective,
  ModalContentDirective,
  ModalActionsDirective,
  ModaCloseDirective,
} from './moda-title-directive.directive';
import { ModalComponentComponent } from './modalstories-component/modal-component/modal-component.component';

@NgModule({
  declarations: [
    ModalContainerComponent,
    ModaTitleDirective,
    ModalContentDirective,
    ModalActionsDirective,
    ModaCloseDirective,
    ModalComponentComponent,
  ],
  imports: [CommonModule, OverlayModule, PortalModule],
  providers: [Modal],
  exports: [
    ModalContainerComponent,
    ModaTitleDirective,
    ModalContentDirective,
    ModalActionsDirective,
    ModaCloseDirective,
  ],
})
export class ModalModule {}
