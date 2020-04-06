import { TestBed } from '@angular/core/testing';

import { RetentionService } from './retention.service';

describe('RetentionService', () => {
  let service: RetentionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetentionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
