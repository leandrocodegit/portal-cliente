import { StatusTarefaDescriptions } from '@/modulos/tarefas/models/status-tarefa.enum';
import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { IncidentService } from '@/shared/services/incident.service';
import { LogsService } from '@/shared/services/logs.service';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-lista-logs',
  imports: [
    TabsModule,
    TabelaComponent
  ],
  templateUrl: './lista-logs.component.html',
  styleUrl: './lista-logs.component.scss'
})
export class ListaLogsComponent implements OnInit {

  @Input() instancia?: any;
  protected tab = 'logs';
  protected logsTarefasExternas: any[] = [];
  protected logsIdentity: any[] = [];
  protected logsJobs: any[] = [];
  protected eventos: any[] = [];
  protected incidentes: any[] = [];
  protected colsLogsTaskExternal: any = [
    { header: '#', field: 'successLog', isLog: true },
    { header: 'Atividade', field: 'activityId' },
    { header: 'Topico', field: 'topicName' },
    { header: 'Tentativas', field: 'retries' },
    { header: 'Data', field: 'timestamp', isDate: true },
    { header: 'Id', field: 'id' },
    { header: 'Processo', field: 'processDefinitionId', isCopy: true }
  ];

  protected colsLogsJobs: any = [
    { header: '#', field: 'successLog', isFail: true },
    { header: 'Excessão', field: 'jobExceptionMessage' },
    { header: 'Topico', field: 'topicName' },
    { header: 'Tentativas', field: 'jobRetries' },
    { header: 'Data', field: 'timestamp', isDate: true },
    { header: 'Vencimento', field: 'jobDueDate', isDate: true },
    { header: 'Id', field: 'id' },
    { header: 'Processo', field: 'processDefinitionId', isCopy: true }
  ];

  protected colsIdentiy: any = [
    { header: 'Operação', field: 'operationType', isTypeTask: true },
    { header: 'Tipo', field: 'type', isTypeTask: true },
    { header: 'Usuário', field: 'userId', isUser: true },
    { header: 'Data', field: 'time', isDate: true },
    { header: 'Grupo', field: 'groupId', isCopy: true },
    { header: 'Tarefa', field: 'taskId', isCopy: true },
    { header: 'Processo', field: 'processDefinitionId', isCopy: true }
  ];

  protected colsEvents: any = [
    { header: 'Tipo', field: 'eventType', isTypeTask: true },
    { header: 'Nome', field: 'eventName' },
    { header: 'Data', field: 'createdDate', isDate: true },
    { header: 'Grupo', field: 'groupId', isCopy: true },
    { header: 'Id', field: 'id', isCopy: true },
  ];

  protected colsIncidentes: any = [
    { header: 'Tipo', field: 'incidentType', isTypeTask: true },
    { header: 'Causa', field: 'causeIncidentId' },
    { header: 'Mensagem', field: 'incidentMessage', isCopy: true },
    { header: 'Data', field: 'incidentTimestamp', isDate: true },
    { header: 'Id', field: 'id', isCopy: true },
  ];

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly incidentService: IncidentService,
    private readonly logsService: LogsService
  ) { }

  ngOnInit(): void {
    this.listaLogsTarefasExternas();
    this.listaLogsIdentity();
    this.listaLogsJobs();
  }

  listaLogsTarefasExternas() {
    this.logsService.logsInstanciaTarefaExterna(this.instancia?.id).subscribe(response => {
      this.logsTarefasExternas = response;
    });
  }

  listaLogsIdentity() {
    this.logsService.logsInstanciaIdentity(this.instancia?.id).subscribe(response => {
      this.logsIdentity = response.filter(log => log.rootProcessInstanceId == this.instancia?.id);
    });
  }

  listaLogsJobs() {
    this.logsService.logsInstanciaJobs(this.instancia?.id).subscribe(response => {
      this.logsJobs = response;
    });
  }

  listaEventos() {
    this.logsService.getEventos(this.instancia?.id).subscribe(response => {
      this.eventos = response;
    });
  }

  listaIncidentes() {
    this.incidentService.listaIncidentesInstancia(this.instancia?.id).subscribe(response => {
      this.incidentes = response;
    });
  }

  selectTab(event: any) {
    this.tab = event;
    if (this.tab == 'logs') {
      this.listaLogsTarefasExternas();
    } else if (this.tab == 'logs-identity') {
      this.listaLogsIdentity();
    }
    else if (this.tab == 'logs-jobs') {
      this.listaLogsJobs();
    }
    else if (this.tab == 'eventos') {
      this.listaEventos();
    } else if (this.tab == 'incidentes') {
      this.listaIncidentes();
    }
  }

  excluir(data: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Remover registro?',
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
        if (this.tab == 'logs') {

        } else if (this.tab == 'logs-identity') {

        }
        else if (this.tab == 'logs-jobs') {

        }
      }
    });

  }
}
