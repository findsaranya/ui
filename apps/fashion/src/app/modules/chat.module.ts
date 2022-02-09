import { NgModule } from '@angular/core';
import { SupportChatModule } from '@tt-webapp/service';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    SupportChatModule.forRoot({
      widgetUrl: 'https://wchat.freshchat.com/js/widget.js',
      initConfig: {
        token: environment.FRESH_CHAT_TOKEN,
        host: 'https://wchat.freshchat.com',
        tags: ['fashion-docs'],
        faqTags: {
          tags: ['visitors-fashion', 'fashion'],
          filterType: 'category',
        },
      },
    }),
  ],
})
export class ChatModule {}
