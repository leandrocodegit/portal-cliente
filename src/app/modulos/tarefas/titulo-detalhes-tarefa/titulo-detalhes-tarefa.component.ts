import { DatePipe, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TarefaService } from 'src/app/shared/services/tarefa.service';
import { IdentityService } from '@/shared/services/identity.service';
import { LayoutService } from '@/base/services/layout.service';
import { GrupoService } from '@/shared/services/grupo.service';
import { Popover, PopoverModule } from 'primeng/popover';
import { Grupo } from '@/modulos/usuarios/models/usuario.model';
import { TipoGrupo } from '@/shared/models/tipo-grupo.enum';
import { NumeroProtocoloComponent } from '@/shared/components/numero-protocolo/numero-protocolo.component';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { TipoDrawer } from '@/base/drawers/tipo-drawers.enum';
import { TaskAssignmentComponent } from '../task-assignment/task-assignment.component';
import { TaskUserAssigneeComponent } from '../task-assignment/task-user-assignee/task-user-assignee.component';

@Component({
  selector: 'app-titulo-detalhes-tarefa',
  imports: [
    DatePipe,
    RouterModule,
    PopoverModule,
    NgFor,
    NumeroProtocoloComponent,
    TaskUserAssigneeComponent
  ],
  templateUrl: './titulo-detalhes-tarefa.component.html',
  styleUrl: './titulo-detalhes-tarefa.component.scss'
})
export class TituloDetalhesTarefaComponent implements OnInit {

  @Input() tarefa?: any;
  @Input() instancia?: any;
  @Output() assigneeEmit = new EventEmitter();
  @ViewChild('op') op!: Popover;

  protected identity?: any[];
  protected departamentos?: any[];
  protected grupos: any[] = [];
  protected layout: LayoutService;

  constructor(
    private readonly tarefaService: TarefaService,
    public readonly layoutService: LayoutService,
    public readonly identityService: IdentityService,
    private readonly instanciaService: InstanciaService,
    private readonly grupoService: GrupoService
  ) {
    this.layout = layoutService;
  }

  ngOnInit(): void {
    this.buscarIdentity();
  }

  buscarIdentity() {
    this.tarefaService.buscarIndentity(this.tarefa.id).subscribe(response => {
      this.identity = response;
      this.listaGrupos();
    });
  }

  selecionarTarefaInfo() {
    this.instanciaService.show({
      tipo: TipoDrawer.DETALHES_TAREFA,
      view: true,
      instanceId: this.instancia.id,
      task: this.tarefa
    });
  }

  getDescricaoGrupo(grupo: Grupo) {
    return this.identity.find(ident => ident?.groupId && ident.groupId == grupo.name) ?? '';
  }

  getInfoGrupo() {
    if (!this.departamentos?.length && this.departamentos?.find(gp => !!gp.groupId))
      return '- - -';

    const departamentos = this.departamentos?.map(ident => this.grupos.find(grupo => ident?.groupId && ident.groupId == grupo.name)?.description ?? ident.groupId);
    if (!this.departamentos)
      return '- - -';

    return departamentos.toString().length > 40 ? departamentos.toString().substring(0, 40) + '...' : departamentos.toString();
  }

  listaGrupos(event?: any) {
    this.grupoService.listaGrupos(TipoGrupo.DEPARTMENT).subscribe(response => {
      this.grupos = response;
      this.departamentos = this.identity.filter(ident => ident?.groupId);
      if (event)
        this.op.show(event)
    });
  }

  contemDepartamento(grupo: Grupo) {
    return this.identity.find(ident => ident?.groupId && ident.groupId == grupo.name) ?? false;
  }

  adicionarDepartamento(grupo: Grupo) {
    if (this.contemDepartamento(grupo)) {
      this.tarefaService.removerGrupoTarefa(this.tarefa.id, {
        groupId: grupo.name,
        type: 'candidate'
      }).subscribe(() => {
        this.buscarIdentity();
      })
    } else {
      this.tarefaService.atribuirGrupoTarefa(this.tarefa.id, {
        groupId: grupo.name,
        type: 'candidate'
      }).subscribe(() => {
        this.buscarIdentity();
      })
    }
  }
}
