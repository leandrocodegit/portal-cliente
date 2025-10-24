import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { ListaDocumentosComponent } from '../../tarefas/lista-documentos/lista-documentos.component';
import { TituloProtocoloComponent } from '../titulo-protocolo/titulo-protocolo.component';
import { StatusTarefaDescriptions } from '../../tarefas/models/status-tarefa.enum';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { ListaFormularioProtocoloComponent } from '../lista-formulario-protocolo/lista-formulario-protocolo.component';
import { ProtocoloService } from '../../../shared/services/protocolo.service';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { FilesTarefaService } from 'src/app/shared/services/files-tarefa.service';
import { HistoryService } from 'src/app/shared/services/history.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { ReabrirProtocoloComponent } from '../reabrir-protocolo/reabrir-protocolo.component';
import { HistoryProcessInstance } from '@/shared/models/history-process-instance.model';
import { Protocolo } from '@/shared/models/protocolo.model';
import { LoadService } from '@/shared/components/preload/load.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Incident } from '@/shared/models/incident.model';
import { ListaIncidentesComponent } from '@/modulos/processo/lista-incidentes/lista-incidentes.component';
import { Job } from '@/shared/models/job.model';
import { JobService } from '@/shared/services/job.service';
import { ListaJobsComponent } from '@/modulos/processo/lista-jobs/lista-jobs.component';
import { formatarDataForm } from '@/shared/services/util/DateUtil';
import { HistoricTask } from '@/shared/models/history-task.model';
import { TimelineComponent } from '@/shared/components/timeline/timeline.component';
import { TipoDrawer } from '@/base/drawers/tipo-drawers.enum';
import { FormularioService } from '@/shared/services/formulario.service';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { IdentityService } from '@/shared/services/identity.service';

@Component({
  selector: 'app-detalhes-protocolo',
  imports: [
    CommonModule,
    TabsModule,
    ListaDocumentosComponent,
    DatePipe,
    TituloProtocoloComponent,
    TabelaComponent,
    ListaFormularioProtocoloComponent,
    ReabrirProtocoloComponent,
    RouterModule,
    ButtonModule,
    TooltipModule,
    ListaIncidentesComponent,
    ListaJobsComponent,
    TimelineComponent,
    TituloPesquisaComponent
  ],
  templateUrl: './detalhes-protocolo.component.html',
  styleUrl: './detalhes-protocolo.component.scss'
})
export class DetalhesProtocoloComponent implements OnInit {


  protected protocolo?: Protocolo;
  protected tab = 'dados';
  protected instancia?: HistoryProcessInstance;
  protected tarefa?: any;
  protected variaveis?: any[] = [];
  protected comentarios?: any[] = [];
  protected tarefas?: HistoricTask[] = [];
  protected incidentes: Incident[] = [];
  protected jobs: Job[] = [];
  protected formCadastro: any = {};

  protected colsInstancia: any = [
    { header: 'Nome', field: 'name' },
    { header: 'Valor', field: 'value' },
    { header: 'Tipo', field: 'type' }
  ];
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };
  protected colsTarefas: any = [
    { header: 'Id', field: 'id' },
    { header: 'key', field: 'taskDefinitionKey' },
    { header: 'Status', field: 'statusTarefa' },
    { header: 'Data início', field: 'startTime' },
    { header: 'Data conclusão', field: 'endTime' },
    { header: 'Prioridade', field: 'priority' },
    { header: 'Responsável', field: 'assignee' },
    { header: 'Descrição', field: 'description' }
  ];
  protected users = new Map<string, string>();

  constructor(
    private readonly instanciaService: InstanciaService,
    private readonly filesTarefaService: FilesTarefaService,
    private readonly historyService: HistoryService,
    private readonly formularioService: FormularioService,
    private readonly jobService: JobService,
    private readonly protocoloService: ProtocoloService,
    public readonly identityService: IdentityService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    private readonly loadService: LoadService,
  ) { }


  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      if (param['tab'])
        this.tab = param['tab'];
      if (param['instanceId'])
        this.carregarDadosProtocolo(param)

    })
  }

  private carregarDadosProtocolo(param: any) {
    if (param['instanceId']) {
      this.buscarInstancia(param['instanceId']);
      this.listaVariaveis(param['instanceId']);
      this.listaComentarios(param['instanceId']);
      this.listaTarefas(param['instanceId'])
    }
  }

  atualizar() {
    if (this.instancia?.id) {
      this.carregarDadosProtocolo({ instanceId: this.instancia?.id });
      this.tab = '1';
    }
  }

  listaIncidentes() {
    this.historyService.listaIncidentesInstancia(this.instancia?.id).subscribe(response => {
      this.incidentes = response;
    });
  }

  buscarFormularioCadastro() {
    this.instanciaService.buscarFormularioCadastro(this.instancia?.id).subscribe(response => {
      this.formCadastro.key = response.value;
      if (response?.value)
        this.formularioService.buscarFormulario(response?.value).subscribe(result => {
          if (result.schema)
            this.formCadastro.schema = JSON.parse(result.schema);
        });
    });
  }

  listaJobs() {
    this.jobService.listaJobsPendentesInstancia(this.instancia?.id).subscribe(response => {
      this.jobs = response;
    });
  }

  buscarInstancia(instanceId: any) {
    this.historyService.buscarInstancia(instanceId).subscribe(response => {
      this.instancia = response;
      this.listaIncidentes();
      this.listaJobs();
      this.buscarFormularioCadastro();
      this.tarefa = {
        processInstanceId: this.instancia.id
      }
      if (this.instancia?.state != 'COMPLETED')
        this.instanciaService.buscarVencimentoInstancia(instanceId).subscribe(response => {
          this.instancia.dataVencimento = response.value;
        });
      this.buscarProtocolo(this.instancia.businessKey);
    });
  }


  buscarProtocolo(protocolo: any) {
    this.protocoloService.buscarProtocolo(protocolo).subscribe(response => {
      this.protocolo = response;
      this.loadService.addRecent({
        id: this.instancia.id,
        name: this.instancia.businessKey,
        descricao: 'Protocolo',
        color: 'text-green-500'
      })
    });
  }

  listaVariaveis(instanceId: any) {
    this.historyService.listarVariaveis(instanceId).subscribe(response => {
      this.variaveis = response.filter(va => va.type != 'File');
      this.variaveis.forEach(element => {
        if (element.type == 'Date')
          element.value = formatarDataForm(new Date(element.value))

      });
      this.variaveis = this.variaveis.filter(v => v.name != 'formKey')
    });
  }

  listaTarefas(instanceId: any) {
    this.historyService.listarTasksInstancia(instanceId).subscribe(response => {
      response.forEach(it => {
        it.statusTarefa = StatusTarefaDescriptions[it.taskState]
      })
      this.tarefas = response;
    });
  }

  listaComentarios(instanceId: any) {
    this.instanciaService.comentariosInstancia(instanceId).subscribe(response => {
      this.comentarios = response;
    });
  }


  contemIncidenteABerto() {
    if (!this.incidentes.length)
      return false;
    return !!this.incidentes.find(incidente => incidente.open);
  }

  selectTab(event: any) {
    this.location.go(`/painel/protocolo/${this.instancia.businessKey}/detalhes/${this.instancia.id}/${event}`);
    this.tab = event;
  }

  voltar() {
    this.location.back();
  }

  visualizarTarefa(event: any) {
    this.router.navigate([`painel/tarefa/detalhes/${event.id}`])
  }


  download(value: any) {
    this.filesTarefaService.downloadAnexo(value.id).subscribe(file => {
      this.baixar(file, value.host);
    });
  }

  baixar(data: Blob, name: string) {
    const blob = new Blob([data], { type: data.type || 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  viewDetalhes() {
    this.instanciaService.show({
      tipo: TipoDrawer.INSTANCE,
      view: true,
      instanceId: this.instancia.id
    });
  }
}
