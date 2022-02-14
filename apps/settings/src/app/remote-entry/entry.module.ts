import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { STATIC_BASE_URL } from '@tt-webapp/service';
import { environment } from '../../environments/environment';

import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
      },
    ]),
  ],
  providers: [ {
    provide: STATIC_BASE_URL,
    useValue: environment.STATIC_BASE_URL,
  },],
})
export class RemoteEntryModule {}
