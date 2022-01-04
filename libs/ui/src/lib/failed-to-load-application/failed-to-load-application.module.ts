import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FailedToLoadApplicationComponent } from './failed-to-load-application.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FailedToLoadApplicationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FailedToLoadApplicationComponent },
    ]),
  ],
})
export class FailedToLoadApplicationModule {}
