import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { CHAT_SERVICE_CONFIG } from '../injection/tokens';
import { IFCFaq, IFreshChat } from './support-chat.model';

@Injectable()
export class SupportChatService {
  private renderer: Renderer2;

  get widget() {
    return window.fcWidget;
  }

  constructor(
    @Inject(CHAT_SERVICE_CONFIG) private chatConfig: IFreshChat,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  init(): void {
    if (!this.chatConfig) {
      throw new Error('Failed to load chat service configuration');
    }
    this.embedChatWidget()
      .then(() => {
        this.widget.init(this.chatConfig.initConfig);
      })
      .catch((error) => {
        throw new Error('Failed embed chat widget' + String(error));
      });
  }

  getUser(): Promise<unknown> {
    return this.widget.user.get();
  }

  createUser(payload: unknown): Promise<void> {
    return this.widget.user.create(payload);
  }

  setUser(payload: unknown): Promise<void> {
    return this.widget.user.setProperties(payload);
  }

  updateUser(payload: unknown): Promise<void> {
    return this.widget.user.update(payload);
  }

  clearUser(): Promise<void> {
    return this.widget.user.clear();
  }

  setFaqTags(faq: IFCFaq): Promise<void> {
    return this.widget.setFaqTags(faq);
  }

  private embedChatWidget() {
    return new Promise((resolve, reject) => {
      const scriptElement: HTMLScriptElement =
        this.renderer.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.src = this.chatConfig.widgetUrl;
      scriptElement.onerror = reject;
      scriptElement.onload = resolve;
      this.renderer.appendChild(document.body, scriptElement);
    });
  }
}
