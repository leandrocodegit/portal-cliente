import { AuthService } from '@/auth/services/auth.service';
import { IdentityService } from '@/shared/services/identity.service';
import { UsuarioService } from '@/shared/services/usuario.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TaskAssignmentComponent } from '../task-assignment.component';
import { Popover, PopoverModule } from 'primeng/popover';
import { TarefaService } from '@/shared/services/tarefa.service';
import { FiltroService } from '@/shared/services/filtro.service';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

export enum TipoResponsavel {
  OWNER = 'OWNER',
  USER = 'USER',
  DELEGATE = 'DELEGATE',
  ADICIONAL = 'ADICIONAL'
}

@Component({
  selector: 'app-task-user-assignee',
  imports: [
    TaskAssignmentComponent,
    PopoverModule,
    TooltipModule,
    ButtonModule
  ],
  templateUrl: './task-user-assignee.component.html',
  styleUrl: './task-user-assignee.component.scss'
})
export class TaskUserAssigneeComponent implements OnInit {

  @Input() tarefa?: any;
  @Input() icon: any;
  @Input() tooltip: any;
  @Input() noIcone = false;
  @Input() noBorder = false;
  @Input() apenasAtribuir = false;
  @Input() isAdicional = false;
  @Input() tipo: TipoResponsavel | '' = TipoResponsavel.USER;
  @Input() isOwnerAll = false;
  @Input() disabled = false;
  @Input() severity: any = 'secondary';
  @Input() width = '2rem';
  @Input() filtroSelecionado?: any;
  @Input() tarefas?: any[] = [];
  @Output() updataEmit = new EventEmitter();
  @Output() closeEmit = new EventEmitter();
  @Output() assigneeEmit = new EventEmitter();
  @Output() unssigneeEmit = new EventEmitter();
  @ViewChild('op') popover!: Popover;

  protected tarefaSelect?: any;

  constructor(
    private readonly filterService: FiltroService,
    private readonly tarefaService: TarefaService,
    private readonly usuarioService: UsuarioService,
    private readonly authService: AuthService,
    public readonly identityService: IdentityService,
    public readonly confirmationService: ConfirmationService
  ) {
    this.filterService.$closePopover.subscribe(() => this.popover.hide());
  }

  ngOnInit(): void {
    if (this.noBorder)
      this.width = 'auto';
  }

  atribuirUsuario(id: any, event?: any) {

    const user = event.user;
    const tipo: TipoResponsavel = event.tipo;

    if (tipo == TipoResponsavel.OWNER) {
      this.tarefa.owner = user.id;
      this.tarefaService.atualizarTarefa(this.tarefa).subscribe(() => {
        this.updataEmit.emit();
      });
      return;
    } else if (tipo == TipoResponsavel.DELEGATE) {
      this.tarefa.assignee = user.id;
      this.tarefaService.delegarTarefa(this.tarefa.id, user.id).subscribe(() => {
        this.updataEmit.emit();
      });
      return;
    } else if (this.tipo == TipoResponsavel.ADICIONAL) {
      this.assigneeEmit.emit(user);
      return;
    } else {
      if (!user) {
        this.removerResponsavel(this.tarefa.id);
        this.updataEmit.emit();
      }
      else if (this.tarefa?.assignee && user) {
        this.removerResponsavelEReassumir(this.tarefa.id, user);

      }
      else if (user) {
        this.assumir(id, user);
      }
      if (this.tarefa?.assignee)
        this.tarefa.assignee = user?.id;
    }
  }

  desassumir() {
    this.removerResponsavel(this.tarefa.id, true)
  }

  removerResponsavelEReassumir(taskId: string, user: any) {
    this.tarefaService.desassumirTarefa(taskId).subscribe(() => {
      this.unssigneeEmit.emit();
      this.assumir(taskId, user);
      this.updataEmit.emit();
    });
  }

  removerResponsavel(taskId: string, update?: boolean) {
    this.popover.hide();
    this.tarefaService.desassumirTarefa(taskId).subscribe(() => {
      this.unssigneeEmit.emit();
      if (update)
        this.updataEmit.emit();
    });
  }

  assumir(id: any, user?: any, click?: MouseEvent) {
    if (click)
      click.stopPropagation();
    if (!user)
      user = { id: this.authService.extrairIdUsuario() };
    if (user)
      this.tarefaService.assumirTarefa({
        taskId: id,
        userId: user.id
      }).subscribe(() => {
        this.updataEmit.emit();
      });
    this.popover.hide();
  }

  toggle(event, click: MouseEvent) {
    click.stopPropagation();
    this.filterService.fecharPopover();
    if (!this.isOwnerAll)
      this.tarefaSelect = undefined;
    var intervalo = setInterval(() => {
      this.tarefaSelect = this.tarefa;
      this.popover.show(event);
      clearInterval(intervalo);
    }, 200);
  }

  public fechar() {
    this.popover.hide();
  }

  assumirTodas(user: any, remover?: boolean) {
    this.confirmationService.confirm({
      message: 'Alterar reponsável de todas tarefas selecionadas',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Sim, continuar',
      },
      accept: () => {
        this.tarefas.forEach(task => {
          if (remover) {
            this.removerResponsavel(task.id)
          } else {
            this.atribuirUsuario(task.id, user);
          }
        })
        this.updataEmit.emit();
      }
    });
  }

  // Assume que TipoResponsavel, this.tarefa, this.icon, this.tooltip e this.noBorder estão definidos no componente.

  // Função refatorada
  getStyle() {
    const isUserType = this.tipo === TipoResponsavel.USER;
    const isAssigned = isUserType ? !!this.tarefa?.assignee : !!this.tarefa?.owner;

    let styleConfig = {
      colorClass: '',
      iconKey: '',
      tooltipKey: '',
    };

    if (isAssigned) {
      styleConfig.colorClass = isUserType ? 'teal' : 'purple';
      styleConfig.iconKey = 'edit';
      styleConfig.tooltipKey = 'edit';
    } else {
      styleConfig.colorClass = 'red';
      styleConfig.iconKey = 'add';
      styleConfig.tooltipKey = 'add';
    }

    const defaultIcons = { add: 'pi-user', edit: 'pi-user-plus' };
    const defaultTooltips = { add: 'Adicionar responsável', edit: 'Editar responsável' };

    const iconName = this.icon?.[styleConfig.iconKey] ?? defaultIcons[styleConfig.iconKey];
    const tooltipText = this.tooltip?.[styleConfig.tooltipKey] ?? defaultTooltips[styleConfig.tooltipKey];
    const color = styleConfig.colorClass;

    return {
      class: !this.noBorder
        ? `flex items-center justify-center bg-${color}-100 dark:bg-${color}-400/10 rounded-full cursor-pointer hover-icon`
        : '',
      icon: `${iconName} text-${color}-${isAssigned ? '500' : '400'}`,
      tooltip: tooltipText,
    };
  }
}
