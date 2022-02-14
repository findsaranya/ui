/* eslint-disable @typescript-eslint/no-unused-vars */
import { RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CHAT_SERVICE_CONFIG } from '../injection/tokens';

import { SupportChatService } from './support-chat.service';

describe('ChatService', () => {
  const mockRender = {
    createRenderer: jest.fn((hostElement, type) => ({
      appendChild: jest.fn((parent, newChild) => {
        newChild.onload();
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
        return new Promise((resolve, reject) => {
          resolve();
        });
      },
      track: () => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      },
      user: {
        get: () => {
          return new Promise((resolve, reject) => {
            resolve({ result: { data: '' } });
          });
        },
        create: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
        setProperties: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
        update: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
        clear: () => {
          return new Promise((resolve, reject) => {
            resolve();
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
              createRenderer: jest.fn((hostElement, type) => ({
                appendChild: jest.fn((parent, newChild) => {
                  newChild.onerror();
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
