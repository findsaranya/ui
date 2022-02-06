import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotSubscribedComponent } from './not-subscribed.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotSubscribedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: NotSubscribedComponent }]),
  ],
})
export class NotSubscribedModule {}
