import { RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CHAT_SERVICE_CONFIG } from '../injection/tokens';

import { SupportChatService } from './support-chat.service';

describe('ChatService', () => {
  const mockRender = {
    createRenderer: jest.fn((a, b) => ({
      appendChild: jest.fn((a, b) => {
        b.onload();
      }),
      createElement: () => ({
        type: '',
        src: '',
        onerror: null,
        onload: null,
      }),
    })),
  };

  describe('Success load', () => {
    let service: SupportChatService;
    window.fcWidget = {
      init: () => 0,
      close: () => true,
      destroy: () => true,
      isInitialized: () => true,
      isLoaded: () => true,
      isOpen: () => true,
      on: () => true,
      open: () => true,
      setFaqTags: () => {
        return new Promise((r, reject) => {
          r();
        });
      },
      track: () => {
        return new Promise((r, reject) => {
          r();
        });
      },
      user: {
        get: () => {
          return new Promise((r, reject) => {
            r({ result: { data: '' } });
          });
        },
        create: () => {
          return new Promise((r, reject) => {
            r();
          });
        },
        setProperties: () => {
          return new Promise((r, reject) => {
            r();
          });
        },
        update: () => {
          return new Promise((r, reject) => {
            r();
          });
        },
        clear: () => {
          return new Promise((r, reject) => {
            r();
          });
        },
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          SupportChatService,
          {
            provide: CHAT_SERVICE_CONFIG,
            useValue: {
              widgetUrl: 'widget.js',
              initConfig: {
                token: '',
                host: 'https://chat.example.com',
              },
            },
          },
          {
            provide: RendererFactory2,
            useValue: mockRender,
          },
        ],
      });
      service = TestBed.inject(SupportChatService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should init the chat widget', () => {
      document.body = document.createElement('body');
      expect(service.init()).resolves.toBeUndefined();
      expect(service.widget).not.toBeNull();
    });

    it('should return the user', () => {
      expect(service.getUser()).resolves.not.toBeNull();
    });
    it('should create the user', () => {
      expect(service.createUser({})).resolves.not.toBeNull();
    });
    it('should set the user', () => {
      expect(service.setUser({})).resolves.not.toBeNull();
    });
    it('should update the user', () => {
      expect(service.updateUser({})).resolves.not.toBeNull();
    });
    it('should clear the user', () => {
      expect(service.clearUser()).resolves.not.toBeNull();
    });
    it('should set the FAQ', () => {
      expect(
        service.setFaqTags({ filterType: '', tags: [] })
      ).resolves.not.toBeNull();
    });
  });

  describe('Fail load', () => {
    let service: SupportChatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          SupportChatService,
          {
            provide: CHAT_SERVICE_CONFIG,
            useValue: {
              widgetUrl: 'widget.js',
              initConfig: {
                token: '',
                host: 'https://chat.example.com',
              },
            },
          },
          {
            provide: RendererFactory2,
            useValue: {
              createRenderer: jest.fn((a, b) => ({
                appendChild: jest.fn((a, b) => {
                  b.onerror();
                }),
                createElement: () => ({
                  type: '',
                  src: '',
                  onerror: null,
                  onload: null,
                }),
              })),
            },
          },
        ],
      });
      service = TestBed.inject(SupportChatService);
    });

    it('should failed to init the chat widget', () => {
      document.body = document.createElement('body');
      expect(service.init()).rejects.toBeInstanceOf(Error);
    });
  });
});
