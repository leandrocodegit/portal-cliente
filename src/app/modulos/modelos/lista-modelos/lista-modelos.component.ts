import { Component, OnInit } from '@angular/core';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModeloService } from 'src/app/shared/services/modelo.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from 'src/environments/environment.dev';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { FormularioModelosComponent } from '../formulario-modelos/formulario-modelos.component';
import { DownloadService } from '@/shared/services/download.service';

@Component({
  selector: 'app-lista-modelos',
  imports: [
    TabelaComponent,
    TituloPesquisaComponent,
    PdfViewerModule,
    ButtonModule,
    DialogModule,
    FormularioModelosComponent
  ],
  templateUrl: './lista-modelos.component.html',
  styleUrl: './lista-modelos.component.scss'
})
export class ListaModelosComponent implements OnInit {

  protected modelo: any;
  protected base64?: any;
  protected viewForm = false;
  protected cols: any = [
    { header: 'Descrição', field: 'descricao' },
    { header: 'Arquivo', field: 'nomeArquivo' },
    { header: 'Ativo', field: 'enabled' },
    { header: 'Id', field: 'id' },
  ]

  protected itens: any[] = [];

  constructor(
    private readonly modeloService: ModeloService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly downloadService: DownloadService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.listarModelos();
  }

  listarModelos() {
    this.modeloService.listaModelos().subscribe(response => {
      this.itens = response;
    })
  }

  ativarModelo(event: any) {
    this.modeloService.ativarModelo(event.id).subscribe(response => {
      this.listarModelos();
    })
  }

  visualizarDocumento(event: any) {
    this.modelo = event;
    this.modeloService.getbas64(event.id).subscribe(response => {
      this.base64 = response.content;
    })

  }

  editar(event: any){
    this.modelo = event;
    this.viewForm =  true;
  }

  getUrl() {
    return `${environment.urlApi}/modelos/download/${this.modelo.id}`
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
        label: 'Sim, remover',
      },
      accept: () => {
        this.modeloService.removerModelo(event).subscribe(() => {
          this.messageService.add({ severity: 'info', summary: 'Confirmação', detail: 'Modelo foi removido' });
          this.listarModelos();
        }, error => {

        })
      }
    });
  }

   download(value: any) {
    this.modeloService.downloadModelo(value.id).subscribe(file => {
      this.downloadService.baixar(file, value.nomeArquivo);
    });
  }

}
