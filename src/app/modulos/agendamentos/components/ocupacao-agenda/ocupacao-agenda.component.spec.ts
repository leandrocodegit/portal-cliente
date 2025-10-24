import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupacaoAgendaComponent } from './ocupacao-agenda.component';

describe('OcupacaoAgendaComponent', () => {
  let component: OcupacaoAgendaComponent;
  let fixture: ComponentFixture<OcupacaoAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcupacaoAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcupacaoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
