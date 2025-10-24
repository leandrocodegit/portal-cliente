import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioConfiguracaoProtocoloComponent } from './formulario-configuracao-protocolo.component';

describe('FormularioConfiguracaoProtocoloComponent', () => {
  let component: FormularioConfiguracaoProtocoloComponent;
  let fixture: ComponentFixture<FormularioConfiguracaoProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioConfiguracaoProtocoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioConfiguracaoProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
