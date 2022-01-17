import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './button/button.module';
import { FormFieldModule } from './form-field/form-field.module';
import { InputModule } from './input/input.module';

@NgModule({
  imports: [CommonModule, ButtonModule, FormFieldModule, InputModule],
  declarations: [],
  exports: [FormFieldModule, InputModule],
})
export class UiModule {}
