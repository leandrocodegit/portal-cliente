import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGrupoComponent } from './formulario-grupo.component';

describe('FormularioGrupoComponent', () => {
  let component: FormularioGrupoComponent;
  let fixture: ComponentFixture<FormularioGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
