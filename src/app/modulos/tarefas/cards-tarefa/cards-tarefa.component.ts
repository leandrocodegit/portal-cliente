import { DataPosteriorPipe } from '@/shared/pipes/data-prosterior.pipe';
import { FiltroService } from '@/shared/services/filtro.service';
import { IdentityService } from '@/shared/services/identity.service';
import { TarefaService } from '@/shared/services/tarefa.service';
import { DrawerModule } from 'primeng/drawer';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Popover, PopoverModule } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';
import { StatusTarefaDescriptions } from '../models/status-tarefa.enum';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { DatePickerModule } from 'primeng/datepicker';
import { HistoricTask } from '@/shared/models/history-task.model';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { formatarData } from '@/shared/services/util/DateUtil';
import { DataVencidaPipe } from '@/shared/pipes/data-vencida.pipe';
import { DataProximaVencimentoPipe } from '@/shared/pipes/data-proximo-vencimento.pipe';
import { TagModule } from 'primeng/tag';
import { Filtro } from '@/modulos/filtros/models/filtro.model';
import { AuthService } from '@/auth/services/auth.service';
import { DescricaoTarefaComponent } from '../descricao-tarefa/descricao-tarefa.component';
import { Task } from '@/shared/models/task';
import { ConfirmationService } from 'primeng/api';
import { NumeroProtocoloComponent } from '@/shared/components/numero-protocolo/numero-protocolo.component';
import { TaskAssignmentComponent } from '../task-assignment/task-assignment.component';
import { TaskUserAssigneeComponent, TipoResponsavel } from '../task-assignment/task-user-assignee/task-user-assignee.component';
import { TAREFA_OWNER } from '@/shared/models/parametros-util';
import { Role } from '@/auth/models/role-auth.enum';
import { DelateState } from '@/shared/models/constantes/delegate-state';

@Component({
  selector: 'app-cards-tarefa',
  imports: [
    TooltipModule,
    DatePipe,
    DataPosteriorPipe,
    DataVencidaPipe,
    DataProximaVencimentoPipe,
    RouterModule,
    OverlayBadgeModule,
    PopoverModule,
    DatePickerModule,
    ButtonModule,
    FormsModule,
    TagModule,
    DrawerModule,
    DescricaoTarefaComponent,
    NumeroProtocoloComponent,
    TaskUserAssigneeComponent
  ],
  templateUrl: './cards-tarefa.component.html',
  styleUrl: './cards-tarefa.component.scss'
})
export class CardsTarefaComponent implements OnInit {

  protected statusTarefaDescriptions = StatusTarefaDescriptions;
  @Input() filtros: any[] = [];
  @Input() height = '100%';
  @Input() tarefas: Map<string, Task[]> = new Map();
  @Output() updataTarefas = new EventEmitter;

  protected usuarioClaim?: any;
  protected tarefaSelecionada?: Task;
  protected filtroSelecionado?: Filtro;
  protected vencimento = new Date();
  protected acompanhamento = new Date();
  protected tarefasSelecionadas: Map<string, Task[]> = new Map();
  protected viwDetalhes = false;
  protected viewData = true;
  protected tipos = {
    owner: TipoResponsavel.OWNER,
    delegate: TipoResponsavel.DELEGATE
  }

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

  @ViewChild('op') popover!: Popover;
  @ViewChild('opVencimento') opVencimento!: Popover;
  @ViewChild(TaskAssignmentComponent) taskAssine!: TaskAssignmentComponent;

  constructor(
    private readonly filterService: FiltroService,
    private readonly tarefaService: TarefaService,
    private readonly authService: AuthService,
    public readonly identity: IdentityService,
    public readonly confirmationService: ConfirmationService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  verTarefa(tarefa: any) {
    this.router.navigate([`painel/tarefa/detalhes/${tarefa.id}`])
  }

  removerTarefa(id: any, click: MouseEvent) {
    click.stopPropagation();
    this.tarefaService.removerTarefa(id).subscribe(() => {
      this.updataTarefas.emit();
    });
  }

  permiteAssumir(tarefa: any) {
    if(this.authService.isAdmin())
      return true;
    if (tarefa?.delegationState == DelateState.PENDING && tarefa?.assignee != this.authService.extrairIdUsuario())
      return false;
    return (!tarefa?.assignee && (!this.isSupervisionada(tarefa)))
  }


  abrirListaUsuarios(filtro: any, event: any) {
    this.tarefaSelecionada = undefined;
    this.filtroSelecionado = undefined;
    this.popover.hide();
    this.filtroSelecionado = filtro;
    var intervalo = setInterval(() => {
      this.popover.show(event);
      clearInterval(intervalo);
    }, 200);
  }

  toggleVencimento(task, event, click: MouseEvent) {
    click.stopPropagation();
    this.opVencimento.hide();
    this.tarefaSelecionada = task;
    if (this.tarefaSelecionada?.due)
      this.vencimento = new Date(this.tarefaSelecionada.due)
    if (this.tarefaSelecionada?.followUp)
      this.acompanhamento = new Date(this.tarefaSelecionada.followUp)

    var intervalo = setInterval(() => {
      this.opVencimento.show(event);
      clearInterval(intervalo);
    }, 200);

  }

  atualizarVencimento(isVencimento?: boolean) {
    if (isVencimento) {
      this.tarefaSelecionada.due = formatarData(new Date(this.vencimento));
    } else {
      this.tarefaSelecionada.followUp = formatarData(new Date(this.acompanhamento));
    }
    this.salvar();
  }

  removerVencimento(isVencimento?: boolean) {
    if (isVencimento) {
      this.tarefaSelecionada.due = null;
    } else {
      this.tarefaSelecionada.followUp = null;
    }
    this.salvar();
  }

  isSupervisionada(task) {
    if (this.authService.isAdmin())
      return true;
    return task?.name == TAREFA_OWNER;
  }

  isSupervisionadaUsuarioAtual(task) {
    if (this.authService.isAdmin())
      return true;
    return task?.name == TAREFA_OWNER && task?.owner == this.authService.extrairIdUsuario();
  }

  salvar() {
    this.tarefaService.salvarTarefa(this.tarefaSelecionada).subscribe(response => {
      this.opVencimento.hide();
      this.updataTarefas.emit();
    });
  }


  isTaskSelecionada(filtro: any, task: Task) {
    Array.from(this.tarefasSelecionadas.values()).some(filtro =>
      filtro.some(it => it.id === task.id)
    );
    return this.tarefasSelecionadas.get(filtro.id)?.some(it => it.id === task.id)
  }

  filtroTaskSelecionada(task: Task): string | null {
    for (const [filtro, lista] of this.tarefasSelecionadas.entries()) {
      if (lista.some(it => it.id === task.id)) {
        return filtro;
      }
    }
    return null; // não encontrada
  }

  totalTaskSelecionada(filtro: any) {
    return this.tarefasSelecionadas.get(filtro.id)?.length ?? 0;
  }

  totalTaskSelecionadaAssumidas(filtro: any, assumida: boolean) {
    return this.tarefasSelecionadas.get(filtro.id)?.filter(task => !!task?.assignee == assumida)?.length ?? 0;
  }

  totalTask(filtro: any) {
    return this.tarefas.get(filtro.id)?.length ?? 0;
  }

  totalTaskAssumidas(filtro: any, assumida: boolean) {
    return this.tarefas.get(filtro.id)?.filter(task => !!task?.assignee == assumida)?.length ?? 0;
  }

  selecionarTarefaInfo(task: any, click: MouseEvent) {
    click.stopPropagation();
    this.tarefaSelecionada = task;
    this.viwDetalhes = true;
  }

  selecionarTarefa(filtroId: string, task: Task) {

    if (!this.permiteAssumir(task))
      return;
    this.tarefaSelecionada = task;
    let tasks: Task[] = this.tarefasSelecionadas.get(filtroId);

    if (!tasks)
      tasks = [];
    if (!!tasks?.find(it => it.id == task.id))
      this.tarefasSelecionadas.set(filtroId, tasks.filter(it => it.id != task.id))
    else {
      tasks.push(task)
      this.tarefasSelecionadas.set(filtroId, tasks)
    }

    if (this.tarefasSelecionadas.get(filtroId).length == 0)
      this.tarefasSelecionadas.delete(filtroId);

  }

  atualizarFiltro(filtro: Filtro) {
    this.filterService.recarregarFiltro(filtro);
  }

  selecionarTodasTarefas(filtro: Filtro) {
    if (this.tarefasSelecionadas.has(filtro.id)) {
      this.tarefasSelecionadas.delete(filtro.id);
      return;
    } else {
      this.tarefasSelecionadas.set(filtro.id, this.tarefas.get(filtro.id));
    }
  }

  completarTarefas(filtro: any) {
    this.confirmationService.confirm({
      message: 'Concluir todas tarefas selecionadas',
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
        this.tarefasSelecionadas.get(filtro.id).forEach(task => {
          this.tarefaService.comcluirTarefa(task.id).subscribe(response => {
            // this.loadService.removerRecent(this.instancia.businessKey);
            this.selecionarTarefa(this.filtroTaskSelecionada(task), task);
            if (this.tarefasSelecionadas.size == 0)
              this.updataTarefas.emit();
          }, error => this.tarefasSelecionadas.delete(task.id));
        })
      }
    });
  }

  completarTarefa(task: any) {
    this.confirmationService.confirm({
      message: 'Concluir Tarefas',
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
        this.tarefaService.comcluirTarefa(task.id).subscribe(response => {
          this.selecionarTarefa(this.filtroTaskSelecionada(task), task);
          if (this.tarefasSelecionadas.size == 0)
            this.updataTarefas.emit();
        });
      }
    });
  }


}
