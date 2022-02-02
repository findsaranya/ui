import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorDirective } from './error.directive';
import { FormFieldComponent } from './form-field.component';
import { HintDirective } from './hint.directive';
import { LabelDirective } from './label.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormFieldComponent,
    LabelDirective,
    ErrorDirective,
    HintDirective,
  ],
  exports: [FormFieldComponent, LabelDirective, ErrorDirective, HintDirective],
})
export class FormFieldModule {}
