import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { Modal } from './modal.service';
import { ModalContainerComponent } from './modal-container.component';
import { ModaTitleDirective } from './moda-title-directive.directive';

@NgModule({
  declarations: [ModalContainerComponent, ModaTitleDirective],
  imports: [CommonModule, OverlayModule, PortalModule],
  providers: [Modal],
  exports: [ModalContainerComponent, ModaTitleDirective],
})
export class ContentmodalModule {}
