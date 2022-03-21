import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotSubscribedComponent } from './not-subscribed.component';

@NgModule({
  declarations: [NotSubscribedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: NotSubscribedComponent }]),
  ],
})
export class NotSubscribedModule {}
