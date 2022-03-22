import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '@tt-webapp/ui/modal';
import { PromptModalComponent } from './prompt-modal/prompt-modal.component';
import { ButtonModule } from '@tt-webapp/ui/button';

@NgModule({
  declarations: [PromptModalComponent],
  imports: [CommonModule, ModalModule, ButtonModule],
})
export class PromptModalModule {}
