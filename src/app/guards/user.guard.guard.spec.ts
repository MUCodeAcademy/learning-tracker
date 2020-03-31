import { TestBed } from '@angular/core/testing';

import { User.GuardGuard } from './user.guard.guard';

describe('User.GuardGuard', () => {
  let guard: User.GuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(User.GuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
