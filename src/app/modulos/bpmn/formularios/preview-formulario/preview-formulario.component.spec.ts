import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFormularioComponent } from './preview-formulario.component';

describe('PreviewFormularioComponent', () => {
  let component: PreviewFormularioComponent;
  let fixture: ComponentFixture<PreviewFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
