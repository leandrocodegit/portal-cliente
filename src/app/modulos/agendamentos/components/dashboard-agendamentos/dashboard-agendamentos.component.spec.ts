import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAgendamentosComponent } from './dashboard-agendamentos.component';

describe('DashboardAgendamentosComponent', () => {
  let component: DashboardAgendamentosComponent;
  let fixture: ComponentFixture<DashboardAgendamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAgendamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
