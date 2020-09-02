import { TestBed } from '@angular/core/testing';

import { CheckSignupService } from './check-signup.service';

describe('CheckSignupService', () => {
  let service: CheckSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
