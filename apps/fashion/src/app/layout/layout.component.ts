import { Component, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, Auth, STATIC_BASE_URL } from '@tt-webapp/service';
import { AppConfig } from '@tt-webapp/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'tt-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  name$: Observable<string>;

  navigation$: Observable<AppConfig.INavigation | null>;

  get staticUrl() {
    return this._staticUrl;
  }

  constructor(
    private store: Store<AppState>,
    @Inject(STATIC_BASE_URL) private _staticUrl: string
  ) {
    this.name$ = this.store.pipe(select(Auth.fullName));
    // Here navigation always non NULL
    this.navigation$ = this.store.pipe(select(AppConfig.getNavigation));
  }

  onCollapse(e: boolean): void {
    this.store.dispatch(AppConfig.navigationPinToggle({ collapsed: e }));
  }
}
