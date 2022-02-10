import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { Modal, ViewContainerService } from './modal.service';
import { ModalContainerComponent } from './modal-container.component';
import {
  ModaTitleDirective,
  ModalContentDirective,
  ModalActionsDirective,
  ModaCloseDirective,
} from './moda-title.directive';
import {
  ModalComponent,
  ModalMainComponent,
  PromptComponent,
} from './modalstories-component/modal-component/modal-component.component';
import { ButtonModule } from '../button/button.module';

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
  providers: [ViewContainerService, Modal],
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
