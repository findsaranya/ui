import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { OptionModule } from '../option/option.module';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteTriggerDirective } from './autocomplete-trigger.directive';

@NgModule({
  declarations: [AutocompleteComponent, AutocompleteTriggerDirective],
  imports: [CommonModule, OverlayModule, OptionModule],
  exports: [AutocompleteComponent, AutocompleteTriggerDirective, OptionModule],
})
export class AutocompleteModule {}
