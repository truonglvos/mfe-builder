import { TestBed } from '@angular/core/testing';

import { StateComponentService } from './state-component.service';

describe('StateComponentService', () => {
  let service: StateComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
