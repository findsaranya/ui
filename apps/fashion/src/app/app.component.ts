import { Component } from '@angular/core';
import { SupportChatService } from '@tt-webapp/service';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fashion';
  constructor(private supportChat: SupportChatService) {
    this.supportChat.init();
  }
}
