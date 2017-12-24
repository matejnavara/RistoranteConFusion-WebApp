import { TestBed, inject } from '@angular/core/testing';

import { ProcessHttpService } from './process-http.service';

describe('ProcessHttpmsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessHttpService]
    });
  });

  it('should be created', inject([ProcessHttpService], (service: ProcessHttpService) => {
    expect(service).toBeTruthy();
  }));
});
