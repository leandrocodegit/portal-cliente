import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHistoryDashboardComponent } from './event-history-dashboard.component';

describe('EventHistoryDashboardComponent', () => {
  let component: EventHistoryDashboardComponent;
  let fixture: ComponentFixture<EventHistoryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventHistoryDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventHistoryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
