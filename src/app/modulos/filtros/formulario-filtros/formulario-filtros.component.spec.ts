import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFiltrosComponent } from './formulario-filtros.component';

describe('FormularioFiltrosComponent', () => {
  let component: FormularioFiltrosComponent;
  let fixture: ComponentFixture<FormularioFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioFiltrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
