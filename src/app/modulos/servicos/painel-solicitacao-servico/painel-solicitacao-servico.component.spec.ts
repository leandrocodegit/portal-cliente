import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelSolicitacaoServicoComponent } from './painel-solicitacao-servico.component';

describe('PainelSolicitacaoServicoComponent', () => {
  let component: PainelSolicitacaoServicoComponent;
  let fixture: ComponentFixture<PainelSolicitacaoServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelSolicitacaoServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelSolicitacaoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
