import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { OptionModule } from '../option/option.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, OptionModule, OverlayModule],
  exports: [SelectComponent, OptionModule],
})
export class SelectModule {}
