declare global {
  interface Window {
    fcWidget: FCWidget;
  }
}

export interface IFreshChat {
  widgetUrl: string;
  initConfig: IFCWidgetInit;
}
export interface FCWidget {
  init: (data: IFCWidgetInit) => void;
  isOpen: () => boolean;
  track: (title: string, data: unknown) => Promise<void>;
  setFaqTags: (payload: IFCFaq) => Promise<void>;
  isInitialized: () => boolean;
  isLoaded: () => boolean;
  open: (payload: unknown) => void;
  close: () => void;
  destroy: () => void;
  on: (
    event:
      | 'widget:opened'
      | 'widget:closed'
      | 'widget:loaded'
      | 'user:created'
      | 'unreadCount:notify',
    callback: () => void
  ) => void;
  user: {
    get: () => Promise<{ result: { data: unknown } }>;
    create: (payload: unknown) => Promise<void>;
    setProperties: (payload: unknown) => Promise<void>;
    update: (payload: unknown) => Promise<void>;
    clear: () => Promise<void>;
  };
}

export interface IFCWidgetInit {
  token: string;
  host: string;
  open?: boolean;
  tags?: string[];
  faqTags?: IFCFaq;
  externalId?: string;
  restoreId?: string;
  locale?: string;
  siteId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  phoneCountryCode?: string;
  config?: IFCConfig;
}

export interface IFCFaq {
  tags: string[];
  filterType: string;
}

interface IFCConfig {
  showFAQOnOpen?: boolean;
  hideFAQ?: boolean;
  disableEvents?: boolean;
  cssNames?: {
    widget?: string;
    open?: string;
    expanded?: string;
  };
  agent?: IFCAgent;
  headerProperty?: IFCHeaderProperty;
  content: IFCContent;
}

interface IFCAgent {
  hideName?: boolean;
  hidePic?: boolean;
  hideBio?: boolean;
}

interface IFCHeaderProperty {
  backgroundColor?: string;
  foregroundColor?: string;
  backgroundImage?: string;
  hideChatButton?: boolean;
  direction?: 'ltr';
  fontName?: string;
  fontUrl?: string;
  appName?: string;
  appLogo?: string;
}

interface IFCContent {
  placeholders?: IFCPlaceholders;
  actions?: IFCActions;
  headers?: IFCHeaders;
}

interface IFCPlaceholders {
  search_field?: string;
  reply_field?: string;
  csat_reply?: string;
}

interface IFCActions {
  csat_yes?: string;
  csat_no?: string;
  push_notify_yes?: string;
  push_notify_no?: string;
  tab_faq?: string;
  tab_chat?: string;
  csat_submit?: string;
}

interface IFCHeaders {
  chat?: string;
  chat_help?: string;
  faq?: string;
  faq_help?: string;
  faq_not_available?: string;
  faq_search_not_available?: string;
  faq_useful?: string;
  faq_thankyou?: string;
  faq_message_us?: string;
  push_notification?: string;
  csat_question?: string;
  csat_yes_question?: string;
  csat_no_question?: string;
  csat_thankyou?: string;
  csat_rate_here?: string;
  channel_response?: {
    offline?: string;
    online?: {
      minutes?: {
        one?: string;
        more?: string;
      };
      hours?: {
        one?: string;
        more?: string;
      };
    };
  };
}
