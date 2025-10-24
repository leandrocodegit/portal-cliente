import { Component, OnInit, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';
import { TabsModule } from 'primeng/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StatusTarefaDescriptions } from '../models/status-tarefa.enum';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { TituloCurtoComponent } from 'src/app/shared/components/titulo-curto/titulo-curto.component';
import { TituloDetalhesTarefaComponent } from '../titulo-detalhes-tarefa/titulo-detalhes-tarefa.component';
import { ButtonModule } from 'primeng/button';
import { environment } from 'src/environments/environment.dev';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { PrimeNG } from 'primeng/config';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { forkJoin } from 'rxjs';
import { ListaDocumentosComponent } from '../lista-documentos/lista-documentos.component';
import { TextareaModule } from 'primeng/textarea';
import { AuthService } from '@/auth/services/auth.service';
import { FilesTarefaService } from 'src/app/shared/services/files-tarefa.service';
import { TarefaService } from 'src/app/shared/services/tarefa.service';
import { ProcessDefinitionService } from 'src/app/shared/services/process-definition.service';
import { VisaoFormularioComponent } from '../../bpmn/formularios/criar-formulario-customizado/visao-formulario/visao-formulario.component';
import { VisaoFluxoComponent } from '../../bpmn/fluxos/visao-fluxo/visao-fluxo.component';
import { IdentityService } from '@/shared/services/identity.service';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { LoadService } from '@/shared/components/preload/load.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Incident } from '@/shared/models/incident.model';
import { IncidentService } from '@/shared/services/incident.service';
import { JobService } from '@/shared/services/job.service';
import { Job } from '@/shared/models/job.model';
import { formatarDataForm } from '@/shared/services/util/DateUtil';
import { ConfirmationService } from 'primeng/api';
import { CardsTarefaComponent } from '../cards-tarefa/cards-tarefa.component';
import { CriarTarefaComponent } from '../criar-tarefa/criar-tarefa.component';
import { TAREFA_OWNER } from '@/shared/models/parametros-util';
import { Task } from '@/shared/models/task';
import { DelateState } from '@/shared/models/constantes/delegate-state';
import { isUUID } from 'validator';

declare var sign: any;

@Component({
  selector: 'app-detalhes-tarefa',
  imports: [
    CommonModule,
    RouterModule,
    TabsModule,
    DatePipe,
    TituloCurtoComponent,
    TituloDetalhesTarefaComponent,
    VisaoFormularioComponent,
    VisaoFluxoComponent,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    FileUploadModule,
    BadgeModule,
    ProgressBarModule,
    ListaDocumentosComponent,
    TextareaModule,
    CriarTarefaComponent
  ],
  templateUrl: './detalhes-tarefa.component.html',
  styleUrl: './detalhes-tarefa.component.scss'
})
export class DetalhesTarefaComponent implements OnInit {

  protected statusTarefaDescriptions = StatusTarefaDescriptions;
  protected usuarioClaim?: any;
  protected tarefa?: Task;
  protected historico: any[] = [];
  protected incidentes: Incident[] = [];
  protected jobs: Job[] = [];
  protected comentarios: any[] = [];
  protected formulario?: any;
  protected variaveis?: any;
  protected instancia?: any;
  protected xml?: any;
  protected tab = 'formulario';
  protected viewAnexar = false;
  protected viewComentar = false;
  protected viewAssinar = true;
  protected files = [];
  protected totalSize: number = 0;
  protected totalSizePercent: number = 0;
  protected descricao = '';
  protected maxHeight = 'calc(100vh - 90px)'
  protected users = new Map<string, string>();
  protected identity: IdentityService;
  protected quantidadeDocumentos = 0;
  protected quantidadeAnexos = 0;
  protected tarefaFormKeySanitized!: SafeResourceUrl;
  protected comentarioSelect: any = {
    message: ''
  };


  protected cols: any = [
    { header: 'Nome', field: 'name' }

  ]
  protected filtroSelect: any;
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  @ViewChild('op') op!: Popover;
  @ViewChild(CardsTarefaComponent) cardTarefa!: CardsTarefaComponent;

  constructor(
    private readonly filesTarefaService: FilesTarefaService,
    private readonly tarefaService: TarefaService,
    private readonly identityService: IdentityService,
    private readonly instanciaService: InstanciaService,
    private readonly processDefinitionService: ProcessDefinitionService,
    private readonly activeRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly confirmationService: ConfirmationService,
    private readonly incidentService: IncidentService,
    private readonly jobService: JobService,
    private readonly loadService: LoadService,
    private readonly sanitizer: DomSanitizer,
    private readonly location: Location,
    private readonly router: Router,
    private config: PrimeNG,
  ) {
    this.identity = identityService;
  }
  ngOnInit(): void {

    this.activeRoute.params.subscribe(param => {
      if (param['tab'])
        this.tab = param['tab'];
      if (param['id']) {
        this.buscarTarefa(param['id']);
      }
    })
  }

  voltar() {
    this.location.back();
  }


  buscarIsntancia() {
    if (this.tarefa?.processInstanceId)
      this.instanciaService.buscarInstancia(this.tarefa.processInstanceId).subscribe(response => {
        this.instancia = response;
        this.loadService.addRecent({
          id: this.instancia.businessKey,
          name: this.instancia.businessKey,
          descricao: 'Tarefa',
          color: 'text-teal-500'
        })
      });
  }

  completarTarefa() {
    if (this.tarefa.delegationState == DelateState.PENDING) {
      this.tarefaService.resolveTarefa(this.tarefa, {}).subscribe(response => {
        this.router.navigate(['/painel/tarefa'])
      });
    } else {
      this.tarefaService.comcluirTarefa(this.tarefa.id).subscribe(response => {
        if (this.instancia?.businessKey)
          this.loadService.removerRecent(this.instancia?.businessKey);
        this.router.navigate(['/painel/tarefa'])
      });
    }

  }

  isTarefaAdicional() {
    return this.tarefa?.name == TAREFA_OWNER;
  }

  selectTab(event: any) {
    this.location.go(`/painel/tarefa/detalhes/${this.tarefa.id}/${event}`);
    this.tab = event;
    this.carregarTabs();
  }

  private carregarTabs(force?: boolean) {

    if (this.tab == 'diagrama')
      this.buscarDiagrama();
    else if (this.tab == 'historico')
      this.listaHitorico(this.tarefa.id);
    else if (this.tab == 'comentarios')
      this.listaComentarios(this.tarefa.id);

    if (force) {
      this.listaDocumentos();
      this.listaAnexosInstancia();
      this.listaComentarios(this.tarefa.id);
      this.listaHitorico(this.tarefa.id);
    }
  }

  buscarTarefa(taskId: any) {
    this.tarefaService.buscarTarefa(taskId).subscribe(response => {
      this.tarefa = response;
      this.buscarIsntancia();
      this.carregarTabs(true);
      this.buscarFormularopTarefa(this.tarefa.id);
      this.listaIncidentes();
      this.listaJobs();
      if (this.tarefa?.formKey)
        this.tarefaFormKeySanitized = this.sanitizer.bypassSecurityTrustResourceUrl(this.tarefa.formKey);

    });
  }

  buscarFormularopTarefa(taskId: any) {
    if (this.tarefa?.camundaFormRef && !this.isTarefaAdicional()) {
      this.tarefaService.buscarFormularopTarefa(taskId).subscribe(response => {
        this.formulario = response;
        this.listaVariaveis();
      });
    } if (this.isTarefaAdicional()) {
      this.tarefaService.listaFormulariosTarefaAdicional(taskId).subscribe(response => {


        this.formulario = JSON.parse(response.value[0].schema);
        console.log(this.formulario);
        this.listaVariaveis();
      });
    } else if (!this.tarefa?.formKey) {
      this.tab = 'concluir';
    }

  }

  buscarDiagrama() {
    if (this.tarefa?.processDefinitionId)
      this.processDefinitionService.buscarFluxo(this.tarefa.processDefinitionId).subscribe(response => {
        this.xml = response.bpmn20Xml;
      });
  }

  listaDocumentos() {
    this.filesTarefaService.listaVariaveisInstancia(this.tarefa?.processInstanceId).subscribe(response => {
      this.quantidadeDocumentos = response.filter(file => file.type == 'File').length
    });
  }

  listaIncidentes() {
    this.incidentService.listaIncidentesInstancia(this.tarefa?.processInstanceId).subscribe(response => {
      this.incidentes = response;
    });
  }

  listaAnexosInstancia() {
    this.filesTarefaService.listaAnexosInstancia(this.tarefa.processInstanceId).subscribe(response => {
      this.quantidadeAnexos = response.length;
    });
  }

  listaJobs() {
    this.jobService.listaJobsPendentesInstancia(this.tarefa?.processInstanceId).subscribe(response => {
      this.jobs = response;
    });
  }

  listaHitorico(taskId: any) {
    this.tarefaService.historicoTarefa(taskId).subscribe(response => {
      this.historico = response;
     });
  }

  listaVariaveis() {
    this.tarefaService.listaVariaveis(this.tarefa.id).subscribe(response => {
      this.variaveis = response;
      this.formulario.components.forEach((element: any) => {
        if (element.type == 'datetime' || element.type == 'date' || element.type == 'Date')
          this.variaveis[element.key].value = formatarDataForm(new Date(this.variaveis[element.key]?.value))
      });
    });
  }

  listaComentarios(taskId: any) {
    this.tarefaService.comentariosTarefa(taskId).subscribe(response => {
      this.comentarios = response;
    });
  }

  salvarComentario(idTarefa: string, reload: boolean) {
    if (this.comentarioSelect?.id) {
      this.tarefaService.atualizarComentariosTarefa(idTarefa, this.comentarioSelect).subscribe(() => {
        if (reload)
          this.listaComentarios(this.tarefa.id);
      });
    } else {
      this.tarefaService.criarComentariosTarefa(idTarefa, this.comentarioSelect).subscribe(() => {
        if (reload)
          this.listaComentarios(this.tarefa.id);
      });
    }
  }

  criarComentario() {
    this.salvarComentario(this.tarefa.id, false)
    this.salvarComentario(this.getTaskTarefaOwner().id, true);
  }

  removerComentario(comentario: any) {
    this.confirmationService.confirm({
      message: 'Remover comentário',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim, concluir',
      },
      accept: () => {
        this.tarefaService.removerComentariosTarefa(this.tarefa.id, comentario.id).subscribe(() => this.listaComentarios(this.tarefa.id));
      }
    });
  }

  anexar() {
    this.viewAnexar = true;
  }

  isUsuarioCriacao(userId: any) {
    return this.authService.extrairIdUsuario() == userId;
  }

  excluirAnexo(data: any) {
    this.confirmationService.confirm({
      message: 'Remover anexo',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim, concluir',
      },
      accept: () => {
        this.filesTarefaService.removerAnexo(data.taskId, data.id).subscribe();
      }
    });
  }


  isOwner() {
    return this.tarefa.name == TAREFA_OWNER && !!this.tarefa?.owner;
  }

  getTaskTarefaOwner(): any {

    if (this.isOwner())
      return {
        id: this.tarefa.parentTaskId,
        processInstanceId: this.tarefa.caseInstanceId,
      }

    return this.tarefa;
  }

  onUpload(event: any) {
    const files = event.files;


    if (files && files.length > 0) {
      const requests = files.map(file =>
        this.filesTarefaService.anexarDocumento({
          task: this.getTaskTarefaOwner(),
          descricao: this.descricao,
          file: file
        })
      );

      forkJoin(requests).subscribe({
        next: () => {
          this.viewAnexar = false;
        },
        error: (err) => {
          console.error('Erro ao anexar os arquivos:', err);
        }
      });
    }
  }

  recuperarNome(historia: any) {
    var value = historia.orgValue ?? historia.newValue;
    if(value && !isUUID(value))
       return this.statusTarefaDescriptions[value] ?? value;

    if (historia.operationType.toLowerCase().includes('assign') || historia.operationType.toLowerCase().includes('delegate') || historia.operationType.toLowerCase().includes('claim'))
      return this.identityService.getUserName(value);
    if (historia.operationType.toLowerCase().includes('group'))
      return this.identityService.getGroupName(value);
    return this.statusTarefaDescriptions[value] ?? value;
  }

  getUrl() {
    return `${environment.urlApi}/file/task/${this.tarefa.id}/attachment/create`;
  }

  choose(event, callback) {
    callback();
  }

  onRemoveTemplatingFile(event, file, removeFileCallback, index) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onSelectedFiles(event) {
    this.files = event.currentFiles;
    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback) {
    callback();
  }

  formatSize(bytes) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }

  assinar() {
    this.viewAssinar = false;
    sign(this.tarefa?.formKey);
  }

  enviarFormulario(data: any) {
    try {
      this.tarefaService.resolveTarefa(this.tarefa, data).subscribe({
        next: () => console.log('Todos arquivos enviados com sucesso'),
        error: err => console.error('Erro ao enviar', err)
      });

      if (data?.files?.size > 0)
        this.filesTarefaService.anexarDocumentoFormulario(this.tarefa, data).subscribe(() => {
        })
    } catch (err) {
      console.error('Erro ao converter algum arquivo para base64', err);
    }
  }

  atribuirUsuario(event: any) {
    console.log('Evento', event);

  }
}
