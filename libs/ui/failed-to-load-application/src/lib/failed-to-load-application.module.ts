import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FailedToLoadApplicationComponent } from './failed-to-load-application.component';

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
