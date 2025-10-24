import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloDocumentoComponent } from './titulo-documento.component';

describe('TituloDocumentoComponent', () => {
  let component: TituloDocumentoComponent;
  let fixture: ComponentFixture<TituloDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
