import { TestBed } from '@angular/core/testing';

import { JasttipsDataService } from './jasttips-data.service';

describe('JasttipsDataService', () => {
  let service: JasttipsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JasttipsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
