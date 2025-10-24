import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelDashboardComponent } from './painel-dashboard.component';

describe('PainelDashboardComponent', () => {
  let component: PainelDashboardComponent;
  let fixture: ComponentFixture<PainelDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
