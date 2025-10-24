import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PreencherSolicitacaoServicoComponent } from '@/shared/components/preencher-solicitacao-servico/preencher-solicitacao-servico.component';
import { PublicoService } from '@/shared/services/publicos.service';
import { LoadService } from '@/shared/components/preload/load.service';

@Component({
  selector: 'app-preencher-solicitacao-servico-publico',
  imports: [PreencherSolicitacaoServicoComponent],
  templateUrl: './preencher-solicitacao-servico-publico.component.html',
  styleUrl: './preencher-solicitacao-servico-publico.component.scss'
})
export class PreencherSolicitacaoServicoPublicoComponent implements OnDestroy {

  @Output() dataEmit = new EventEmitter();
  protected servico?: any;
  protected formulario?: any;
  protected schema?: any;
  protected protocolo: any = {};
  protected redirect?: string;
  protected intervalo?: any;
  protected mensagem?: any = {};

  constructor(
    private readonly publicoService: PublicoService,
    private readonly activeRoute: ActivatedRoute,
    private readonly loadService: LoadService,
    private readonly router: Router,
    private readonly location: Location) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.redirect = param['redirect'];
      if (param['protocolo']) {
        this.protocolo.protocolo = {
          numeroProtocolo: param['protocolo']
        };
      } else {
        if (param['formulario'])
          this.publicoService.buscarServico(param['servico']).subscribe(response => {
            this.servico = response;
            if (param['formulario'])
              this.publicoService.buscarFormulario(param['formulario'], this.servico.usarUltimaVersao).subscribe(response => {
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
    this.publicoService.gerarProtocoloFormulario(this.servico.id, data).subscribe({
      next: (response) => {
        this.location.go(`painel/servico/${this.servico.id}/${this.formulario.id}/${response.protocolo.numeroProtocolo}`);
        this.protocolo = response;
        this.loadService.hide();

        if (this.redirect && this.redirect !== '' && this.redirect !== null && this.redirect !== 'null') {
          setTimeout(() => {
            if (this.redirect.startsWith('http')) {
              window.location.href = this.redirect;
            } else {
              this.router.navigateByUrl(this.redirect);
            }
          }, 10000);
        }
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

  ngOnDestroy() {
    if (this.intervalo)
      clearInterval(this.intervalo);
  }
}
