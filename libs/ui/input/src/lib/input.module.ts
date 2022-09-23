import { NgModule } from '@angular/core';
import { FormFieldModule } from '@findsaranya/ui/form-field';
import { InputDirective } from './input.directive';

@NgModule({
  imports: [FormFieldModule],
  declarations: [InputDirective],
  exports: [InputDirective, FormFieldModule],
})
export class InputModule {}
