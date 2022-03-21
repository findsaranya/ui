import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ButtonModule } from '@tt-webapp/ui/button';
import { ModalContainerComponent } from './modal-container.component';
import {
  ModaTitleDirective,
  ModalContentDirective,
  ModalActionsDirective,
  ModaCloseDirective,
} from './modal-title.directive';
import { Modal } from './modal.service';
import {
  ModalComponent,
  ModalMainComponent,
  PromptComponent,
} from './modalstories-component/modal-component.component';

@NgModule({
  declarations: [
    ModalContainerComponent,
    ModaTitleDirective,
    ModalContentDirective,
    ModalActionsDirective,
    ModaCloseDirective,
    ModalComponent,
    ModalMainComponent,
    PromptComponent,
  ],
  imports: [CommonModule, OverlayModule, PortalModule, ButtonModule],
  providers: [Modal],
  exports: [
    ModalContainerComponent,
    ModaTitleDirective,
    ModalContentDirective,
    ModalActionsDirective,
    ModaCloseDirective,
    ModalComponent,
    ModalMainComponent,
    PromptComponent,
  ],
})
export class ModalModule {}
