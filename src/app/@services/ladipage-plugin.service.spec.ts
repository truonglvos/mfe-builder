import { TestBed } from '@angular/core/testing';

import { LadipagePluginService } from './ladipage-plugin.service';

describe('LadipagePluginService', () => {
  let service: LadipagePluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LadipagePluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
