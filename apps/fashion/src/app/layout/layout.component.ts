import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, Auth } from '@tt-webapp/service';
import { Observable } from 'rxjs';

@Component({
  selector: 'tt-webapp-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent  {

  collapsed: boolean | null = null;
  name$: Observable<string>;
  
  constructor(private store: Store<AppState>) {
    this.name$ = this.store.pipe(select(Auth.fullName));
  }

  onCollapse(e: boolean): void {
    this.collapsed = e;
  }
}
