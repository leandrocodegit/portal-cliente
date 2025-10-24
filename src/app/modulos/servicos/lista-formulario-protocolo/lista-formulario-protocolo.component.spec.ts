import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFormularioProtocoloComponent } from './lista-formulario-protocolo.component';

describe('ListaFormularioProtocoloComponent', () => {
  let component: ListaFormularioProtocoloComponent;
  let fixture: ComponentFixture<ListaFormularioProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFormularioProtocoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFormularioProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
