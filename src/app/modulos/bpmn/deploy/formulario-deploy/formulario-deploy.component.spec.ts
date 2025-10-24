import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDeployComponent } from './formulario-deploy.component';

describe('FormularioDeployComponent', () => {
  let component: FormularioDeployComponent;
  let fixture: ComponentFixture<FormularioDeployComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioDeployComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
