import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreencherSolicitacaoServicoPublicoComponent } from './preencher-solicitacao-servico-publico.component';

describe('PreencherSolicitacaoServicoPublicoComponent', () => {
  let component: PreencherSolicitacaoServicoPublicoComponent;
  let fixture: ComponentFixture<PreencherSolicitacaoServicoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreencherSolicitacaoServicoPublicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreencherSolicitacaoServicoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
