import { NgModule } from '@angular/core';
import { FormFieldModule } from '@findsaranya/ui/form-field';
import { InputModule } from '@findsaranya/ui/input';
import { TextareaDirective } from './textarea.directive';

@NgModule({
  imports: [FormFieldModule, InputModule],
  declarations: [TextareaDirective],
  exports: [TextareaDirective, FormFieldModule, InputModule],
})
export class TextareaModule {}
