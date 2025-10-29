import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmnTimelineComponent } from './bpmn-timeline.component';

describe('BpmnTimelineComponent', () => {
  let component: BpmnTimelineComponent;
  let fixture: ComponentFixture<BpmnTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BpmnTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BpmnTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
