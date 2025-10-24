import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelPropriedadesComponent } from './painel-propriedades.component';

describe('PainelPropriedadesComponent', () => {
  let component: PainelPropriedadesComponent;
  let fixture: ComponentFixture<PainelPropriedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PainelPropriedadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelPropriedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
