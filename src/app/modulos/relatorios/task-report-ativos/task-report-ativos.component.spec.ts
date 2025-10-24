import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReportAtivosComponent } from './task-report-ativos.component';

describe('TaskReportAtivosComponent', () => {
  let component: TaskReportAtivosComponent;
  let fixture: ComponentFixture<TaskReportAtivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskReportAtivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskReportAtivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
