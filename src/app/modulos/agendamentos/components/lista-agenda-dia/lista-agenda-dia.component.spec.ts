import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAgendaDiaComponent } from './lista-agenda-dia.component';

describe('ListaAgendaDiaComponent', () => {
  let component: ListaAgendaDiaComponent;
  let fixture: ComponentFixture<ListaAgendaDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAgendaDiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAgendaDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
