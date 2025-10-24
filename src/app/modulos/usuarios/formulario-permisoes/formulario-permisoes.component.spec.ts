import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPermisoesComponent } from './formulario-permisoes.component';

describe('FormularioPermisoesComponent', () => {
  let component: FormularioPermisoesComponent;
  let fixture: ComponentFixture<FormularioPermisoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPermisoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPermisoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
