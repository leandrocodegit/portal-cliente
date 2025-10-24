import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoServicoInternoComponent } from './solicitacao-servico-interno.component';

describe('SolicitacaoServicoInternoComponent', () => {
  let component: SolicitacaoServicoInternoComponent;
  let fixture: ComponentFixture<SolicitacaoServicoInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacaoServicoInternoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacaoServicoInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
