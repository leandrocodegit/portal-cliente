import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDurationReportPerirodoComponent } from './process-duration-report-perirodo.component';

describe('ProcessDurationReportPerirodoComponent', () => {
  let component: ProcessDurationReportPerirodoComponent;
  let fixture: ComponentFixture<ProcessDurationReportPerirodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessDurationReportPerirodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessDurationReportPerirodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
