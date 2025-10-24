import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioConectorComponent } from './formulario-conector.component';

describe('FormularioConectorComponent', () => {
  let component: FormularioConectorComponent;
  let fixture: ComponentFixture<FormularioConectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioConectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioConectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
