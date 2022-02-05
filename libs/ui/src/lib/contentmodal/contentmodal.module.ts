import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { Modal } from './modal.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, OverlayModule, PortalModule],
  providers: [Modal],
})
export class ContentmodalModule {}
