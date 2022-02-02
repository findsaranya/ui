import { NgModule } from '@angular/core';
import { FormFieldModule } from '../form-field/form-field.module';
import { InputModule } from '../input/input.module';
import { TextareaDirective } from './textarea.directive';

@NgModule({
  imports: [FormFieldModule, InputModule],
  declarations: [TextareaDirective],
  exports: [TextareaDirective, FormFieldModule, InputModule],
})
export class TextareaModule {}
