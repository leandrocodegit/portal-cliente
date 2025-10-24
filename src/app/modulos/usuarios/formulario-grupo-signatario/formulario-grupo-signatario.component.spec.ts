import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGrupoSignatarioComponent } from './formulario-grupo-signatario.component';

describe('FormularioGrupoSignatarioComponent', () => {
  let component: FormularioGrupoSignatarioComponent;
  let fixture: ComponentFixture<FormularioGrupoSignatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioGrupoSignatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioGrupoSignatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
