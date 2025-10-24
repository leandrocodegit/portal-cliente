import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaoFormularioComponent } from './visao-formulario.component';

describe('VisaoFormularioComponent', () => {
  let component: VisaoFormularioComponent;
  let fixture: ComponentFixture<VisaoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisaoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
