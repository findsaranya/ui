import { Component } from '@angular/core';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  collapsed: boolean | null = null;

  onCollapse(e: boolean): void {
    this.collapsed = e;
  }
}
