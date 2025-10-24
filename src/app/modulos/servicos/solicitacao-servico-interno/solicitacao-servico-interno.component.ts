import { FormularioService } from '@/shared/services/formulario.service';
import { ProtocoloService } from '@/shared/services/protocolo.service';
import { ServicoService } from '@/shared/services/servico.service';
import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PreencherSolicitacaoServicoComponent } from '@/shared/components/preencher-solicitacao-servico/preencher-solicitacao-servico.component';
import { LoadService } from '@/shared/components/preload/load.service';

@Component({
  selector: 'app-solicitacao-servico-interno',
  imports: [
    PreencherSolicitacaoServicoComponent
  ],
  templateUrl: './solicitacao-servico-interno.component.html',
  styleUrl: './solicitacao-servico-interno.component.scss'
})
export class SolicitacaoServicoInternoComponent implements OnInit, AfterViewInit {

  @Output() dataEmit = new EventEmitter();
  protected servico?: any;
  protected formulario?: any;
  protected schema?: any;
  protected protocolo: any = {};
  protected mensagem?: any = {}

  constructor(
    private readonly protocoloService: ProtocoloService,
    private readonly servicoService: ServicoService,
    private readonly formularioService: FormularioService,
    private readonly activeRoute: ActivatedRoute,
    private readonly loadService: LoadService,
    private readonly location: Location) { }

    ngAfterViewInit(): void {
       this.activeRoute.params.subscribe(param => {

      console.log(param);
        });
    }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {

      console.log(param);

      if (param['protocolo']) {
        this.protocolo.protocolo = {
          numeroProtocolo: param['protocolo']
        };
      } else {

        if (param['formulario'])
          this.servicoService.buscarServico(param['servico']).subscribe(response => {
            this.servico = response;
            if (param['formulario'])
              this.formularioService.buscarFormulario(param['formulario'], this.servico.usarUltimaVersao).subscribe(response => {
                this.formulario = response;
                this.schema = JSON.parse(this.formulario.schema)
              }, error => {
              });
          }, error => {
          });
      }
    });
  }

  carregarDadosFormulario(data: any) {
this.protocoloService.gerarProtocoloFormulario(this.servico.id, data).subscribe({
  next: (response) => {
    this.location.go(`painel/servico/${this.servico.id}/${this.formulario.id}/${response.protocolo.numeroProtocolo}`);
    this.protocolo = response;
    this.loadService.hide();
  },
  error: (error) => {
    console.error(error);
    this.mensagem.erro = 'Erro ao enviar formulário!';
    this.loadService.hide();
  },
  complete: () => {
    console.log('Requisição finalizada');
  }
});


  }
}
