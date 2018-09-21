import {TestBed} from '@angular/core/testing';

import {PillService} from './pill.service';

describe('PillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PillService = TestBed.get(PillService);
    expect(service).toBeTruthy();
  });
});
