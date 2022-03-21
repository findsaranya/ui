import { NgModule } from '@angular/core';
import { FormFieldModule } from '@tt-webapp/ui/form-field';
import { InputModule } from '@tt-webapp/ui/input';
import { TextareaDirective } from './textarea.directive';

@NgModule({
  imports: [FormFieldModule, InputModule],
  declarations: [TextareaDirective],
  exports: [TextareaDirective, FormFieldModule, InputModule],
})
export class TextareaModule {}
