import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FailedToLoadApplicationComponent } from './failed-to-load-application/failed-to-load-application.component';
import { NotSubscribedComponent } from './not-subscribed/not-subscribed.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PageNotFoundComponent,
    FailedToLoadApplicationComponent,
    NotSubscribedComponent,
    UnauthorizedComponent
  ],
})
export class SharedComponentsModule {}
