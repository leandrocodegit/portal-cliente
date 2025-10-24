import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarVersaoFormularioComponent } from './selecionar-versao-formulario.component';

describe('SelecionarVersaoFormularioComponent', () => {
  let component: SelecionarVersaoFormularioComponent;
  let fixture: ComponentFixture<SelecionarVersaoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarVersaoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarVersaoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
