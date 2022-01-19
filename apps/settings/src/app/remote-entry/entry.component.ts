import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, Auth } from '@tt-webapp/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'tt-webapp-settings-entry',
  template: `<div class="remote-entry">
      <h2>settings's Remote Entry Component</h2>
    </div>
    <div>
      <p>Hello {{ name$ | async }}</p>
    </div>

    <button type="button" (click)="logout()">Logout</button> `,
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
