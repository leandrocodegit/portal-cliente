import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPaginasComponent } from './formulario-paginas.component';

describe('FormularioPaginasComponent', () => {
  let component: FormularioPaginasComponent;
  let fixture: ComponentFixture<FormularioPaginasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPaginasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
