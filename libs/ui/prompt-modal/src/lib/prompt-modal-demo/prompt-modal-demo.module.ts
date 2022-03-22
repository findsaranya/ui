import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@tt-webapp/ui/button';

import { PromptModalDemoComponent } from './prompt-modal-demo.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  exports: [PromptModalDemoComponent],
  declarations: [PromptModalDemoComponent],
})
export class PromptModalDemoModule {}
