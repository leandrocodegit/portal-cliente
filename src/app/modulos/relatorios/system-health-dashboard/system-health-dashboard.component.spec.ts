import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemHealthDashboardComponent } from './system-health-dashboard.component';

describe('SystemHealthDashboardComponent', () => {
  let component: SystemHealthDashboardComponent;
  let fixture: ComponentFixture<SystemHealthDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemHealthDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemHealthDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
