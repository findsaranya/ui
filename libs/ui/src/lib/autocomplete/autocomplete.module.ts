import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { OptionModule } from '../option/option.module';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { FilterAutocompleteComponent } from './filter-autocomplete.component';
import { InputModule } from '../input/input.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AutocompleteComponent,
    AutocompleteTriggerDirective,
    FilterAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    OptionModule,
    InputModule,
    FormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    AutocompleteComponent,
    AutocompleteTriggerDirective,
    OptionModule,
    FilterAutocompleteComponent,
  ],
})
export class AutocompleteModule {}
