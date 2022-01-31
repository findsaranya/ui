import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from '@angular/core';
import { sideNavSampleData } from './sidebar.model';

@Component({
  selector: 'tt-webapp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  collapsed: boolean;
  showMenu: string;
  navigation = sideNavSampleData;

  @Output() collapsedEvent = new EventEmitter<boolean>();
  constructor() {
    this.collapsed = false;
    this.showMenu = '';
  }

  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }
}
