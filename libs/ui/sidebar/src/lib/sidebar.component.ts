import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { INavigation } from './sidebar.model';
@Component({
  selector: 'tt-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  showMenu: string;

  @Input() navigation!: INavigation | null;
  @Input() staticUrl = '';

  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor() {
    this.showMenu = '';
  }

  addExpandClass(element: string): void {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed(): void {
    this.collapsedEvent.emit(!this.navigation?.collapsed);
  }
}
