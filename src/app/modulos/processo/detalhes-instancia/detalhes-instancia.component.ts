import { Location, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { FilesTarefaService } from 'src/app/shared/services/files-tarefa.service';
import { TarefaService } from 'src/app/shared/services/tarefa.service';
import { VisaoFluxoComponent } from '@/modulos/bpmn/fluxos/visao-fluxo/visao-fluxo.component';
import { ProcessDefinitionService } from '@/shared/services/process-definition.service';
import { DialogModule } from 'primeng/dialog';
import { VisaoFormularioComponent } from '@/modulos/bpmn/formularios/criar-formulario-customizado/visao-formulario/visao-formulario.component';
import { TypeVariableDescriptions } from '@/modulos/bpmn/fluxos/models/type-variable.enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LoadService } from '@/shared/components/preload/load.service';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { IncidentService } from '@/shared/services/incident.service';
import { Incident } from '@/shared/models/incident.model';
import { ListaIncidentesComponent } from '../lista-incidentes/lista-incidentes.component';
import { Job } from '@/shared/models/job.model';
import { JobService } from '@/shared/services/job.service';
import { ListaJobsComponent } from '../lista-jobs/lista-jobs.component';
import { formatarData } from '@/shared/services/util/DateUtil';
import { ExternalTaskService } from '@/shared/services/external-task.service';
import { ListaLogsComponent } from '../logs/lista-logs/lista-logs.component';


@Component({
  selector: 'app-detalhes-instancia',
  imports: [
    TabsModule,
    ButtonModule,
    TabelaComponent,
    RouterModule,
    VisaoFluxoComponent,
    DialogModule,
    VisaoFormularioComponent,
    TituloPesquisaComponent,
    FormsModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    ListaIncidentesComponent,
    ListaJobsComponent,
    NgIf,
    ListaLogsComponent
  ],
  templateUrl: './detalhes-instancia.component.html',
  styleUrl: './detalhes-instancia.component.scss'
})
export class DetalhesInstanciaComponent implements OnInit {

  protected xml?: any;
  protected tab = 'variaveis';
  protected alterarVariavel = false;
  protected criarVariavel = false; .31
  protected verErro = { value: false, detalhes: '..31' };
  protected adicionarItem = false;
  protected instancia?: any;
  protected variavel?: any = {};
  protected variaveis?: any[] = [];
  protected incidentes?: Incident[] = [];
  protected jobs: Job[] = [];
  protected dataVar: any = {};
  protected dataCreateVar: any = {};
  protected historico: any[] = [];
  protected comentarios: any[] = [];
  protected tarefasExternas: any[] = [];
  protected colsInstancia: any = [
    { header: 'Nome', field: 'name' },
    { header: 'Valor', field: 'value', isVerificarDate: true },
    { header: 'Tipo', field: 'type' }
  ];

  protected colsTaskExternal: any = [
    { header: 'Atividade', field: 'activityId' },
    { header: 'Topico', field: 'topicName' },
    { header: 'Protocolo', field: 'businessKey' },
    { header: 'Erro', field: 'errorMessage' },
    { header: 'Tentativas', field: 'retries' },
    { header: 'Prioridade', field: 'priority' },
    { header: 'Bloqueio', field: 'lockExpirationTime' },
    { header: 'Suspenso', field: 'suspended', isTag: true },
    { header: 'Id', field: 'id' },
    { header: 'Processo', field: 'processDefinitionId', isCopy: true }
  ];

  protected tiposVariaveis = [
    {
      nome: 'Texto',
      tipo: 'String',
    },
    {
      nome: 'Data',
      tipo: 'Date',
    },
    {
      nome: 'Numero inteiro',
      tipo: 'Integer',
    },
    {
      nome: 'Numero flutuante',
      tipo: 'Double',
    },
    {
      nome: 'Lista',
      tipo: 'Object'
    }
  ]

  protected tipoVariavel: any = {};
  protected nomeVariavel = '';
  protected schema = {
    components: [],
    type: 'default',
    id: 'Form_1cl4yx1',
    exporter: {
      name: 'Camunda Modeler',
      version: '5.35.0'
    },
    executionPlatform: 'Camunda Platform',
    executionPlatformVersion: '7.23.0',
    schemaVersion: 18
  }

  @Input() instanceId?: any;

  constructor(
    private readonly processDefinitionService: ProcessDefinitionService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly instanciaService: InstanciaService,
    private readonly filesTarefaService: FilesTarefaService,
    private readonly tarefaService: TarefaService,
    private readonly incidentService: IncidentService,
    private readonly jobService: JobService,
    private readonly externalTaskService: ExternalTaskService,
    private readonly loadService: LoadService,
    private readonly location: Location,
    private readonly route: Router
  ) { }


  ngOnInit(): void {
    if (this.instanceId) {
      this.buscarInstancia(this.instanceId);
      this.listaVariaveis(this.instanceId);
    }
  }

  atualizar() {
    if (this.instancia?.id) {
      this.buscarInstancia(this.instancia?.id);
      this.tab = '0';
    }
  }

  buscarInstancia(instanceId: any) {
    this.instanciaService.buscarInstancia(instanceId).subscribe(response => {
      this.instancia = response;
      this.listaIncidentes();
      this.listaJobs();
      this.listaTarefasExternas();
      this.carregarTabs();
      this.loadService.addRecent({
        id: this.instancia.id,
        name: this.instancia.businessKey,
        descricao: 'Detalhes instância'
      })
    });
  }

  listaComentarios(taskId: any) {
    this.tarefaService.comentariosTarefa(taskId).subscribe(response => {
      this.comentarios = response;
    });
  }

  listaIncidentes() {
    this.incidentService.listaIncidentesInstancia(this.instancia.id).subscribe(response => {
      this.incidentes = response;
    });
  }

  listaJobs() {
    this.jobService.listaJobsPendentesInstancia(this.instancia?.id).subscribe(response => {
      this.jobs = response;
    });
  }

  listaTarefasExternas() {
    this.externalTaskService.listarTarefas(this.instancia?.id).subscribe(response => {
      this.tarefasExternas = response;
    });
  }

  listaVariaveis(instanceId: any) {
    this.tarefaService.listaVariaveisInstancia(instanceId).subscribe(response => {
      this.variaveis = response;
      this.variaveis.forEach(element => {
        if (element.type == 'File' && element?.valueInfo?.filename) {
          element.type = 'download'
          element.value = element.valueInfo.filename
        }
      })
    });
  }

  selectTab(event: any) {
    // this.location.go(`/painel/processo/${this.instancia.definitionId}/detalhes/${this.instancia.id}/${event}`);
    this.tab = event;
    this.carregarTabs();

  }

  private carregarTabs() {
    if (this.tab == '4')
      this.buscarDiagrama()
  }

  buscarDiagrama() {
    if (this.instancia?.definitionId)
      this.processDefinitionService.buscarFluxo(this.instancia?.definitionId).subscribe(response => {
        this.xml = response.bpmn20Xml;
      });
  }

  visualizar() {
    this.route.navigate([`/painel/protocolo/${this.instancia?.businessKey}/detalhes/${this.instancia?.id}`])
  }

  voltar() {
    this.location.back();
  }


  download(value: any) {
    this.filesTarefaService.downloadAnexo(`forms/${this.instancia.id}/${value.valueInfo.filename}`).subscribe(file => {
      this.baixar(file, `forms/${this.instancia.id}/${value.valueInfo.filename}`);
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

  gerarVariavel() {

    this.schema.components = [];
    var intervalo = setInterval(() => {
      this.alterVariavel({
        label: this.nomeVariavel.replaceAll(' ', ''),
        name: this.nomeVariavel.replaceAll(' ', ''),
        type: this.tipoVariavel.tipo
      })
      clearInterval(intervalo);
    }, 300);

  }

  adicionarItemLista(value: any) {
    if (!this.tipoVariavel?.data)
      this.tipoVariavel.data = [];

    this.tipoVariavel.data.push({
      value: value
    });

    this.gerarVariavel();

  }

  editarVariavel(value: any) {
    this.schema.components = [];
    this.alterVariavel(value, true);
  }

  alterVariavel(value: any, modal?: boolean) {
    this.variavel = value;

    this.dataVar[value.name] = value.value;

    var input = {
      label: value?.label ?? 'Campo de texto',
      type: TypeVariableDescriptions[value.type],
      layout: {
        row: 'Row_1z0mwnk',
        columns: null
      },

      id: value.name,
      key: value.name,

    }

    this.tipoVariavel.tipo = TypeVariableDescriptions[value.type];

    if (this.tipoVariavel.tipo == 'Object') {
      input['columns'] = [
        {
          'label': 'Valor',
          'key': 'value'
        }
      ];
      input['rowCount'] = 10;
      input['dataSource'] = '=expression_lista';

      this.schema.components.push({
        computeOn: 'change',
        type: 'expression',
        layout: {
          row: 'Row_0ivpd04',
          columns: null
        },
        id: 'lista',
        key: 'expression_lista',
        expression: '=' + JSON.stringify(this.tipoVariavel?.data)
      })
    }

    if (value.type == 'Date') {
      input['dateLabel'] = 'Date'
      input['timeLabel'] = 'Time';
      input['subtype'] = 'datetime';
      input['disallowPassedDates'] = true;
      input['timeSerializingFormat'] = 'no_timezone';
      input['use24h'] = true;
    }

    this.schema.components.push(input)
    this.variavel = value;
    this.alterarVariavel = modal;
  }

  removerVariavel(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja realmente removel essa variável?',
      header: 'Confirmar ação',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim, remover',
      },
      accept: () => {
        this.instanciaService.removerVariavelArquivo(this.instancia.id, event).subscribe(() => {
          this.listaVariaveis(this.instancia.id);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro remover variável!' });
        })
      }
    });
  }

  formEmit(event: any) {
    this.variavel.value = event.data[this.variavel.name];

    if (event?.files?.size > 0) {
      this.instanciaService.anexarDocumentoFormulario(this.instancia.id, {
        data: event.data,
        files: event.files
      }, this.variavel).subscribe(() => {

      })
    }

    if (this.variavel?.type == 'Date') {
      this.variavel.value = formatarData(new Date(this.variavel.value))
    }

    if (this.variavel.type == 'Object') {
      this.variavel.value = JSON.stringify(event.data['expression_lista'].map(val => val.value))
      this.variavel['valueInfo'] = {
        objectTypeName: 'java.util.ArrayList',
        serializationDataFormat: 'application/json'
      }
    }

    this.instanciaService.alterarVariavel(this.instancia.id, this.variavel).subscribe(() => {
      this.criarVariavel = false; this.listaVariaveis(this.instancia.id)
    });
  }

  detalhesErro(value: any) {
    this.verErro.value = true;
    this.externalTaskService.detalhesErro(value.id).subscribe(response => {
      this.verErro.detalhes = response;
    });
  }

}
