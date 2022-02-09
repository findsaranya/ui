import { ModuleWithProviders, NgModule } from '@angular/core';
import { CHAT_SERVICE_CONFIG } from '../injection/tokens';
import { IFreshChat } from './support-chat.model';
import { SupportChatService } from './support-chat.service';

@NgModule({
  providers: [SupportChatService],
})
export class SupportChatModule {
  static forRoot(options: IFreshChat): ModuleWithProviders<SupportChatModule> {
    return {
      ngModule: SupportChatModule,
      providers: [
        {
          provide: CHAT_SERVICE_CONFIG,
          useValue: options,
        },
      ],
    };
  }
}
