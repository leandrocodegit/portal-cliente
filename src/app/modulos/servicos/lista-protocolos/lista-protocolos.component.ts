import { Component, OnInit } from '@angular/core';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { PageService } from 'src/app/shared/services/page.service';
import { TabelaPagindaComponent } from 'src/app/shared/components/tabela-paginada/tabela.component';
import { ProtocoloService } from 'src/app/shared/services/protocolo.service';
import { DialogService } from 'primeng/dynamicdialog';
import { GerarProtocoloComponent } from '../gerar-protocolo/gerar-protocolo.component';
import { Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-lista-protocolos',
  imports: [
    NgIf,
    TabelaPagindaComponent,
    TituloPesquisaComponent,
    TabsModule,
    MessageModule,
    ProgressBarModule
  ],
  providers: [
    DialogService
  ],
  templateUrl: './lista-protocolos.component.html',
  styleUrl: './lista-protocolos.component.scss'
})
export class ListaProtocolosComponent implements OnInit {

  protected loadProtocolo = false;
  protected instancias?: any[] = [];
  protected protocolosHistorico: any[] = [];
  protected colsProtocolo: any = [
    { header: 'Protocolo', field: 'protocolo', subfield: 'numeroProtocolo', isSubfield: true, isCopy: true, sort: 'protocolo.numeroProtocolo' },
    { header: 'Solicitante', field: 'userId',  isUserName: true },
    { header: 'Publico', field: 'publico', isTag: true },
    { header: 'Data criação', field: 'dataCriacao', sort: 'dataCriacao', isTime: true },
    { header: 'Vencimento', field: 'vencimento', sort: 'vencimento', isTime: true },
    { header: 'Serviço', field: 'descricaoServico', sort: 'descricaoServico' },

  ];

  protected colsInstancia: any = [
    { header: 'Protocolo', field: 'businessKey', isProtocolo: true },
    { header: 'Processo', field: 'definitionKey' },
    { header: 'Suspenso', field: 'suspended', isTagReverse: true },
    { header: 'Finalizado', field: 'ended', isTag: true },
  ];
  protected nInstancias = 0;
  protected pagina: {
    paginaInstancia: any,
    paginaProtocoloHistorico: any
  } = {
      paginaInstancia: {},
      paginaProtocoloHistorico: {}
    };

  constructor(
    private readonly protocoloService: ProtocoloService,
    private readonly instanciaService: InstanciaService,
    private readonly dialogService: DialogService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.listarProtocolos('?sort=dataCriacao,desc');
    this.countInstancias();
  }

  paginar(event: any) {
    this.listarProtocolos(event.spring);
  }

  listarProtocolos(sort?: any) {
    this.loadProtocolo = true;
    this.protocoloService.listarProtocolos(sort).subscribe(response => {
      response.content.forEach(prot => {
        prot.numeroProtocolo = prot.protocolo.numeroProtocolo
      })
      this.protocolosHistorico = response.content
      this.pagina['paginaProtocoloHistorico'] = response?.page;
      this.loadProtocolo = false;
    }, error => this.loadProtocolo = false);
  }

  gerarProtocolo() {
    this.dialogService.open(GerarProtocoloComponent, {
      modal: true,
    });
  }

  visualizar(event: any) {
    if (event?.businessKey)
      this.router.navigate([`painel/protocolo/${event?.businessKey}`]);
    else if (event?.protocolo?.numeroProtocolo)
      this.router.navigate([`painel/protocolo/${event?.protocolo?.numeroProtocolo}`]);

  }

  paginarInstancia(event: any) {
    this.listarInstancias(event.camunda);
  }

  countInstancias() {
    this.instanciaService.countInstanciasAtivas().subscribe(result => {
      this.nInstancias = result.count;
      this.pagina['paginaInstancia'] = {
          size: 10,
          totalElements: result.count,
          number: 0
      };
      this.listarInstancias();
      console.log(this.pagina.paginaInstancia);

    });
  }

  listarInstancias(page?: any) {
    this.loadProtocolo = true;
    if (!page)
      page = "&maxResults=10&firstResult=0&sortBy=businessKey&sortOrder=desc"
    this.instanciaService.listarInstanciasAtivas(page).subscribe(response => {
      this.instancias = response;
      this.loadProtocolo = false;
    }, error => this.loadProtocolo = false);
  }
}
