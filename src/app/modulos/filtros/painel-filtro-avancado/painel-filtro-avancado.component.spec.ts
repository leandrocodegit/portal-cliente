import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelFiltroAvancadoComponent } from './painel-filtro-avancado.component';

describe('PainelFiltroAvancadoComponent', () => {
  let component: PainelFiltroAvancadoComponent;
  let fixture: ComponentFixture<PainelFiltroAvancadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelFiltroAvancadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelFiltroAvancadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
