import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@tt-webapp/ui/form-field';
import { InputModule } from '@tt-webapp/ui/input';
import { OptionModule } from '@tt-webapp/ui/option';
import { AutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { AutocompleteComponent } from './autocomplete.component';
import { FilterAutocompleteComponent } from './filter-autocomplete.component';

@NgModule({
  declarations: [
    AutocompleteComponent,
    AutocompleteTriggerDirective,
    FilterAutocompleteComponent,
  ],
  imports: [
    CommonModule,
    FormFieldModule,
    InputModule,
    OverlayModule,
    OptionModule,
    ReactiveFormsModule,
  ],
  exports: [
    AutocompleteComponent,
    AutocompleteTriggerDirective,
    FilterAutocompleteComponent,
    OptionModule,
  ],
})
export class AutocompleteModule {}
