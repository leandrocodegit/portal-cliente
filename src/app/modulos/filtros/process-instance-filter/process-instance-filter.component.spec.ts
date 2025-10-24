import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInstanceFilterComponent } from './process-instance-filter.component';

describe('ProcessInstanceFilterComponent', () => {
  let component: ProcessInstanceFilterComponent;
  let fixture: ComponentFixture<ProcessInstanceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessInstanceFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessInstanceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
