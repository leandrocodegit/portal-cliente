import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreencherSolicitacaoServicoComponent } from './preencher-solicitacao-servico.component';

describe('PreencherSolicitacaoServicoComponent', () => {
  let component: PreencherSolicitacaoServicoComponent;
  let fixture: ComponentFixture<PreencherSolicitacaoServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreencherSolicitacaoServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreencherSolicitacaoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
