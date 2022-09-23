import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { OptionModule } from '@findsaranya/ui/option';
import { SelectComponent } from './select.component';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, OptionModule, OverlayModule],
  exports: [SelectComponent, OptionModule],
})
export class SelectModule {}
