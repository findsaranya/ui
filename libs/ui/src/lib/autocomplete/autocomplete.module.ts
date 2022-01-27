import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleComponent } from './autocomple.component';
import { AutocompleteComponent } from './autocomplete.component';



@NgModule({
  declarations: [
    AutocompleComponent,
    AutocompleteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutocompleComponent,
    AutocompleteComponent
  ]
})
export class AutocompleteModule { }
