import { Component, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, Auth, STATIC_BASE_URL } from '@tt-webapp/service';
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
      <img src="{{ staticUrl }}assets/static/img/dashboard.jpg" alt="logo" />
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

  get staticUrl() {
    return this._staticUrl;
  }

  constructor(
    private store: Store<AppState>,
    @Inject(STATIC_BASE_URL) private _staticUrl: string
  ) {
    this.name$ = this.store.pipe(select(Auth.fullName));
  }

  logout(): void {
    this.store.dispatch(Auth.logout());
  }
}
