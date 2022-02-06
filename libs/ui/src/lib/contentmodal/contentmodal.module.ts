import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { Modal } from './modal.service';
import { ModalContainerComponent } from './modal-container.component';

@NgModule({
  declarations: [
    ModalContainerComponent
  ],
  imports: [CommonModule, OverlayModule, PortalModule],
  providers: [Modal],
  exports: [
    ModalContainerComponent
  ],
})
export class ContentmodalModule {}
