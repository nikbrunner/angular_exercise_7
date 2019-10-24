import { TestBed } from '@angular/core/testing';

import { DatenService } from './daten.service';

describe('DatenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatenService = TestBed.get(DatenService);
    expect(service).toBeTruthy();
  });
});
