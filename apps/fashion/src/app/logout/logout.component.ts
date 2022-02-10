import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Auth } from '@tt-webapp/service';

@Component({
  selector: 'tt-webapp-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.dispatch(Auth.logout());
  }
}
