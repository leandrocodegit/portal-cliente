import { TestBed } from '@angular/core/testing';

import { CustomTranslateServiceService } from './custom-translate-service.service';

describe('CustomTranslateServiceService', () => {
  let service: CustomTranslateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomTranslateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
