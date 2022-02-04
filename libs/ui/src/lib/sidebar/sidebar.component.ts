import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
  Inject,
} from '@angular/core';
import { AppConfig, STATIC_BASE_URL } from '@tt-webapp/service';

@Component({
  selector: 'tt-webapp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  collapsed: boolean;
  showMenu: string;

  @Input() navigation!: AppConfig.INavigation | null;
  @Output() collapsedEvent = new EventEmitter<boolean>();

  get staticUrl() {
    return this._staticUrl;
  }

  constructor(@Inject(STATIC_BASE_URL) private _staticUrl: string) {
    this.collapsed = false;
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
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }
}
