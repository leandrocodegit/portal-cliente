import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUserAssigneeComponent } from './task-user-assignee.component';

describe('TaskUserAssigneeComponent', () => {
  let component: TaskUserAssigneeComponent;
  let fixture: ComponentFixture<TaskUserAssigneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskUserAssigneeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskUserAssigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
