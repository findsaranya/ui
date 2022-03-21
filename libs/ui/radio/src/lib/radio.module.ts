import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button.component';
import { RadioGroupDirective } from './radio-group/radio-group.directive';

@NgModule({
  declarations: [RadioButtonComponent, RadioGroupDirective],
  imports: [CommonModule],
  exports: [RadioButtonComponent, RadioGroupDirective],
})
export class RadioModule {}
