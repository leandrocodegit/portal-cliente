import { TestBed } from '@angular/core/testing';

import { ManipuladorHtmlService } from './manipulador-html.service';

describe('ManipuladorHtmlService', () => {
  let service: ManipuladorHtmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManipuladorHtmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
