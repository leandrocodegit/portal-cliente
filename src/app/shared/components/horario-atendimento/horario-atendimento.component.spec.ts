import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAtendimentoComponent } from './horario-atendimento.component';

describe('HorarioAtendimentoComponent', () => {
  let component: HorarioAtendimentoComponent;
  let fixture: ComponentFixture<HorarioAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioAtendimentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
