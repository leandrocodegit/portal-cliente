import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDurationReportComponent } from './process-duration-report.component';

describe('ProcessDurationReportComponent', () => {
  let component: ProcessDurationReportComponent;
  let fixture: ComponentFixture<ProcessDurationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessDurationReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessDurationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
