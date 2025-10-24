import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarFormularioCustomizadoComponent } from './criar-formulario-customizado.component';

describe('CriarFormularioCustomizadoComponent', () => {
  let component: CriarFormularioCustomizadoComponent;
  let fixture: ComponentFixture<CriarFormularioCustomizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarFormularioCustomizadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarFormularioCustomizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
