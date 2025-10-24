import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaHorariosAgendaComponent } from './lista-horarios-agenda.component';

describe('ListaHorariosAgendaComponent', () => {
  let component: ListaHorariosAgendaComponent;
  let fixture: ComponentFixture<ListaHorariosAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaHorariosAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaHorariosAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
