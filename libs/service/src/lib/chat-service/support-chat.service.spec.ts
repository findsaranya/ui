import { TestBed } from '@angular/core/testing';

import { SupportChatService } from './support-chat.service';

describe('ChatService', () => {
  let service: SupportChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
