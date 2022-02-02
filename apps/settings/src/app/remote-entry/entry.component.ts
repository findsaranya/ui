import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, Auth } from '@tt-webapp/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'tt-webapp-settings-entry',
  template: `
    <!--color code missing  696865 -->
    <p class="text-lg font-bold">
      <span class="text-gray-700">Welcome,</span>
      <span> {{ name$ | async }}</span>
    </p>

    <div class="mt-3">
      <img
        src="http://app.trustrace.local:8080/assets/img/dashboard.jpg"
        alt="logo"
      />
    </div>
  `,
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
      }
    `,
  ],
})
export class RemoteEntryComponent {
  name$: Observable<string>;
  constructor(private store: Store<AppState>) {
    this.name$ = this.store.pipe(select(Auth.fullName));
  }

  logout(): void {
    this.store.dispatch(Auth.logout());
  }
}
