import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { BasicAuthComponent } from './basic-auth/basic-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { STATIC_BASE_URL } from '@tt-webapp/service';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [RemoteEntryComponent, BasicAuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        children: [{ path: '', component: BasicAuthComponent }],
      },
    ]),
  ],
  providers: [
    {
      provide: STATIC_BASE_URL,
      useValue: environment.STATIC_BASE_URL,
    },
  ],
})
export class RemoteEntryModule {}
