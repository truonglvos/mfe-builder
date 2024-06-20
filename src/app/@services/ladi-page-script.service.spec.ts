import { TestBed } from '@angular/core/testing';

import { LadiPageScriptService } from './ladi-page-script.service';

describe('LadiPageScriptService', () => {
  let service: LadiPageScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LadiPageScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
