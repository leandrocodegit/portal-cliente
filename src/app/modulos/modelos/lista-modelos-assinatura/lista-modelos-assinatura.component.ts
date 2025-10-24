import { Component, Input, OnInit } from '@angular/core';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModeloService } from 'src/app/shared/services/modelo.service';
import { environment } from 'src/environments/environment.dev';
import { ButtonModule } from 'primeng/button';
import { PosicionarAssinaturaComponent } from '@/modulos/assinatura/posicionar-assinatura/posicionar-assinatura.component';
import { Location } from '@angular/common';
import { ModeloSignatario } from '@/shared/models/ModeloSignatario';
import { TipoSignatario } from '@/shared/models/PosicaoAssinatura';
import { LayoutService } from '@/base/services/layout.service';
import { DialogModule } from 'primeng/dialog';
import { FormularioModelosComponent } from '../formulario-modelos/formulario-modelos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-modelos-assinatura',
  imports: [
    TabelaComponent,
    TituloPesquisaComponent,
    PosicionarAssinaturaComponent,
    ButtonModule,
    DialogModule,
    FormularioModelosComponent
  ],
  templateUrl: './lista-modelos-assinatura.component.html',
  styleUrl: './lista-modelos-assinatura.component.scss'
})
export class ListaModelosAssinaturaComponent implements OnInit {

  protected modelo: ModeloSignatario;
  protected base64?: any;
  protected viewForm = false;
  protected cols: any = [
    { header: 'Descrição', field: 'descricao' },
    { header: 'Documento', field: 'documentoModelo', subfield: 'descricao', isSubfield: true },
    { header: 'Processo', field: 'processDefinitionId' },
    { header: 'Ativo', field: 'enabled' },
    { header: 'Id', field: 'id' },
  ]
  protected itens: ModeloSignatario[] = [];

  @Input() idModelo: any;

  constructor(
    private readonly modeloService: ModeloService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly location: Location,
    private readonly layoutService: LayoutService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.listarModelos();
    if (this.idModelo && this.router.url.includes('posicionar'))
      this.buscarModelo();
  }

  buscarModelo() {
    this.modeloService.buscarModeloSignatarios(this.idModelo).subscribe(response => {
      this.modelo = response;
      this.configurar(this.modelo)
    });
  }

  listarModelos() {
    this.modeloService.listaModelosSignatarios().subscribe(response => {
      this.itens = response;
    })
  }

  ativarModelo(event: any) {
    this.modeloService.ativarModelo(event.id).subscribe(response => {
      this.listarModelos();
    })
  }

  configurar(event: any) {
    this.modelo = event;
    this.modeloService.getbas64(event.documentoModelo.id).subscribe(response => {
      this.base64 = response.content;
      this.location.go(`/painel/modelo/signatarios/posicionar/${event.id}`);
    });
  }

  getUrl() {
    return `${environment.urlApi}/modelos/download/${this.modelo.id}`
  }

  editar(event: any) {
    this.modelo = event;
    this.viewForm = true;
  }

  removerModelo(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente remover esse grupo?',
      header: 'Confirmar ação',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        severity: 'danger',
        label: 'Sim, remover',
      },
      accept: () => {
        this.modeloService.removerModeloSignatario(event).subscribe(() => {
          this.messageService.add({ severity: 'info', summary: 'Confirmação', detail: 'Modelo foi removido' });
          this.listarModelos();
        }, error => {

        })
      }
    });
  }

  voltar(){
    this.base64 = undefined;
    this.viewForm = false;
    this.listarModelos(); 
  }

}
