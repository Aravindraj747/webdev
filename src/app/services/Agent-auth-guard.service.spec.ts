import { TestBed } from '@angular/core/testing';

import { AgentAuthGuardService } from './Agent-auth-guard.service';

describe('AuthGuardService', () => {
  let service: AgentAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
