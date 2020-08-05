import { TestBed } from '@angular/core/testing';

import { ServiceJasttipsService } from './service-jasttips.service';

describe('ServiceJasttipsService', () => {
  let service: ServiceJasttipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceJasttipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
