import { NgModule } from '@angular/core';
import { FormFieldModule } from '../form-field/form-field.module';
import { InputDirective } from './input.directive';

@NgModule({
  imports: [FormFieldModule],
  declarations: [InputDirective],
  exports: [InputDirective, FormFieldModule],
})
export class InputModule {}
