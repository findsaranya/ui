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
        config: {
          headerProperty: {
            appName: 'TrusTrace',
            backgroundColor: '#FFA440',
            foregroundColor: '#ffffff',
            fontUrl:
              'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            fontName: 'Inter',
          },
        },
      },
    }),
  ],
})
export class ChatModule {}
