import { Component } from '@angular/core';

@Component({
  selector: 'tt-webapp-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent  {

  collapsed: boolean | null = null;

  onCollapse(e: boolean): void {
    this.collapsed = e;
  }
}
