import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessStatusChartComponent } from './process-status-chart.component';

describe('ProcessStatusChartComponent', () => {
  let component: ProcessStatusChartComponent;
  let fixture: ComponentFixture<ProcessStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessStatusChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
