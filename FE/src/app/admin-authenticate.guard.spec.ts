import { TestBed } from '@angular/core/testing';

import { AdminAuthenticateGuard } from './admin-authenticate.guard';

describe('AdminAuthenticateGuard', () => {
  let guard: AdminAuthenticateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminAuthenticateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
