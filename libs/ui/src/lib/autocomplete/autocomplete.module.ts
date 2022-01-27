import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleComponent } from './autocomple.component';



@NgModule({
  declarations: [
    AutocompleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutocompleComponent
  ]
})
export class AutocompleteModule { }
