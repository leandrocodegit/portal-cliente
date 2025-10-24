import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { TabsModule } from 'primeng/tabs';
import { FormularioConfiguracaoProtocoloComponent } from '../formulario-configuracao-protocolo/formulario-configuracao-protocolo.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ListaProtocolosComponent } from '../lista-protocolos/lista-protocolos.component';
import { Location } from '@angular/common';
import { ProtocoloService } from 'src/app/shared/services/protocolo.service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { GerarProtocoloComponent } from '../gerar-protocolo/gerar-protocolo.component';
import { ServicoService } from '@/shared/services/servico.service';
import { FormularioServicoComponent } from '../formulario-servico/formulario-servico.component';
import { ListaPaginasComponent } from '../lista-paginas/lista-paginas.component';
import { ConfirmationService } from 'primeng/api';
import { ListaCategoriasComponent } from '../lista-categorias/lista-categorias.component';
import { ConfiguracaoProtocolo } from '@/shared/models/protocolo.model';

@Component({
  selector: 'app-lista-servicos',
  imports: [
    FormsModule,
    AccordionModule,
    ButtonModule,
    TimelineModule,
    AvatarModule,
    BadgeModule,
    TabelaComponent,
    TituloPesquisaComponent,
    TabsModule,
    ListaProtocolosComponent,
    SelectModule,
    DialogModule,
    FormularioServicoComponent,
    ListaPaginasComponent,
    ListaCategoriasComponent,
    FormularioConfiguracaoProtocoloComponent
  ],
  templateUrl: './lista-servicos.component.html',
  styleUrl: './lista-servicos.component.scss'
})
export class ListaServicosComponent implements OnInit {

  protected cols: any = [
    { header: 'Nome', field: 'nome' },
    { header: 'Categoria', field: 'categoria', isSubfield: true, subfield: 'nome' },
    { header: 'Processo', field: 'processId' },
    { header: 'Versão', field: 'version' },
    { header: 'Recente', field: 'usarUltimaVersao', isTag: true },
    { header: 'Publico', field: 'publico' },
    { header: 'Ativo', field: 'enabled' },
    { header: 'Prazo', field: 'prazo' },
    { header: 'Data início', field: 'dataInicio', isDate: true },
    { header: 'Id', field: 'id' },
  ];

  protected colsConfiguracoes: any = [
    { header: 'Descrição', field: 'descricao' },
    { header: 'Prefixo', field: 'prefixo' },
    { header: 'Prioridade', field: 'prioridade' }
  ];

  protected servicos: any[] = [];
  protected configuracoes: any[] = [];
  protected configuracao?: ConfiguracaoProtocolo = new ConfiguracaoProtocolo;
  protected size: number = 10;
  protected showLogout = false;
  protected servicoSelecionado?: any;
  protected visible = false;
  protected viewFormularioConfiguracao = false;
  protected tab = 'servicos';
  protected options = [
    { label: 10, value: 10 },
    { label: 50, value: 50 },
    { label: 100, value: 100 }
  ];

  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  constructor(
    private readonly protocoloService: ProtocoloService,
    private readonly servicoService: ServicoService,
    private readonly confirmationService: ConfirmationService,
    private readonly dialogService: DialogService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(param => {
      if (param['tab'])
        this.tab = param['tab'];
      this.carregarListas();
    })
  }

  carregarListas() {
    if (this.tab == 'configuracao-protocolo')
      this.listaConfiguracaoProtocolos();
    else this.listaServicos();
  }

  selectTab(event: any) {
    this.location.go(this.router.url.split('&')[0] + `&tab=${event}`);
    this.tab = event;
    this.carregarListas();
  }

  listaServicos() {
    this.servicoService.listarServicos().subscribe(response => {
      this.servicos = response;
    });
  }

  listaConfiguracaoProtocolos() {
    this.protocoloService.listarConfiguracoesDeProtocolos().subscribe(response => {
      this.configuracoes = response;
    });
  }


  editarServico(event: any) {
    this.servicoSelecionado = event;
    this.visible = true;
  }

  editarConfiguracao(event: any) {
    this.dialogService.open(FormularioConfiguracaoProtocoloComponent, {
      data: event,
      modal: true,
    });
  }

  removerServico(event: any) {
    this.confirmationService.confirm({
      message: 'Deseja realmente remover esse serviço?',
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
        this.servicoService.removerServico(event).subscribe(response => {
          this.listaServicos();
        });
      }
    });
  }

  duplicarServico(event: any) {
    this.servicoService.duplicarServico(event).subscribe(response => {
      this.listaServicos();
    });
  }

  removerConfiguracao(event: any) {
    this.confirmationService.confirm({
      message: 'Deseja realmente remover essa configuração?',
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
        this.protocoloService.removerConfiguracoesDeProtocolo(event).subscribe(response => {
          this.listaConfiguracaoProtocolos();
        });
      }
    });

  }

  lock(event: any) {
    this.servicoService.habilitarServico(event.id).subscribe(response => {
      var servico = this.servicos.find(serv => serv.id == event.id);
      if (servico)
        servico.enabled = !servico.enabled;
    });
  }

  novaConfiguracao() {
      this.dialogService.open(FormularioConfiguracaoProtocoloComponent, {
      data: new ConfiguracaoProtocolo,
      modal: true,
    });

  }

  gerarProtocolo() {
    this.dialogService.open(GerarProtocoloComponent, {
      modal: true,
    });
  }
}
