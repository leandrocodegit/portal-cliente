import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioModelosComponent } from './formulario-modelos.component';

describe('FormularioModelosComponent', () => {
  let component: FormularioModelosComponent;
  let fixture: ComponentFixture<FormularioModelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioModelosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
