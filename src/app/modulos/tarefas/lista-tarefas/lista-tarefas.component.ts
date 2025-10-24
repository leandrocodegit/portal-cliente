import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule, DatePipe } from '@angular/common';
import { StatusTarefaDescriptions } from '../models/status-tarefa.enum';
import { Popover, PopoverModule } from 'primeng/popover';
import { Router, RouterModule } from '@angular/router';
import { IdentityService } from 'src/app/shared/services/identity.service';
import { TarefaService } from 'src/app/shared/services/tarefa.service';
import { FiltroService } from 'src/app/shared/services/filtro.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TooltipModule } from 'primeng/tooltip';
import { DataPosteriorPipe } from '@/shared/pipes/data-prosterior.pipe';
import { CardsTarefaComponent } from '../cards-tarefa/cards-tarefa.component';
import { Task } from '@/shared/models/task';
import { HistoricTask } from '@/shared/models/history-task.model';
import { Filtro } from '@/modulos/filtros/models/filtro.model';
import { TAREFA_OWNER } from '@/shared/models/parametros-util';
@Component({
  selector: 'app-lista-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    SelectButtonModule,
    MessageModule,
    DataViewModule,
    ButtonModule,
    PopoverModule,
    RouterModule,
    OverlayBadgeModule,
    TooltipModule,
    CardsTarefaComponent
  ],
  templateUrl: './lista-tarefas.component.html',
  styleUrl: './lista-tarefas.component.scss'
})
export class ListaTarefasComponent implements OnInit {

  protected statusTarefaDescriptions = StatusTarefaDescriptions;
  protected filtros: any[] = [];
  protected tarefas: Map<string, Task[]> = new Map;

  protected usuarioClaim?: any;
  protected tarefaSelecionada?: any;

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

  constructor(
    private readonly filterService: FiltroService,
    private readonly tarefaService: TarefaService,
    public readonly identity: IdentityService,
    private readonly router: Router
  ) {

    filterService.$updateFiltro.subscribe(data => {
      this.executarFiltro(data);
    });
  }
  ngOnInit(): void {
    this.listaFiltros();
  }


  listaFiltros() {
    this.filterService.listaFiltros().subscribe(response => {
      this.filtros = response.sort((a, b) => a.properties.priority - b.properties.priority);
      if (this.filtros.length) {
        this.filtrarTarefas();
        this.filtroSelect = this.filtros[0].id;
        //this.contarTarefas();
      }
    });
  }

  getFiltrosIndividuais() {
    return this.filtros.filter(filter => filter?.properties?.view == 'INDIVIDUAL');
  }

  getFiltrosGerais() {
    return this.filtros.filter(filter => filter?.properties?.view != 'INDIVIDUAL');
  }

  contarTarefas() {
    this.filtros.forEach(filtro => {
      this.filterService.quantidadeTarefas(filtro.id).subscribe(response => {
        filtro.count = response.count;
      });
    })
  }

  filtrarTarefas() {
    this.filtros.forEach(filtro => {
      this.executarFiltro(filtro);
    })
  }

  executarFiltro(filtro: Filtro) {
    this.filterService.filtrarTarefas(filtro).subscribe(response => {
      if (filtro.properties?.naoSupervisionadas)
        this.tarefas.set(filtro.id, response.filter(task => !task?.owner && task.name != TAREFA_OWNER));
      else
        this.tarefas.set(filtro.id, response);
    });
  }

  verTarefa(tarefa: any) {
    this.router.navigate([`painel/tarefa/detalhes/${tarefa.id}`])
  }

  removerTarefa(id: any, click: MouseEvent) {
    click.stopPropagation();
    this.tarefaService.removerTarefa(id).subscribe(() => {
      this.contarTarefas();
    });
  }

  assumir(id: any, click: MouseEvent) {
    click.stopPropagation();
    const userJson = sessionStorage.getItem('id_token_claims_obj')
    const user = JSON.parse(userJson);
    if (user?.sub)
      this.tarefaService.assumirTarefa({
        taskId: id,
        userId: user.sub
      }).subscribe(() => {
        this.filtrarTarefas();
        this.contarTarefas();
      });
  }

  toggle(task, event, click: MouseEvent) {
    click.stopPropagation();
    this.op.hide();
    if (!this.isInstanciaUsuario(task)) {
      this.tarefaSelecionada = task;
      var intervalo = setInterval(() => {
        this.op.show(event);
        clearInterval(intervalo);
      }, 200);
    }
  }


  isInstanciaUsuario(task) {
    return !task?.processInstanceId;
  }

  removerResponsavel() {
    this.op.hide();
    this.tarefaService.desassumirTarefa(this.tarefaSelecionada.id).subscribe(() => {
      this.filtrarTarefas();
      this.contarTarefas();
    });
  }

  private atualizarTarefa(taskId: any) {
    this.tarefaService.buscarTarefa(taskId).subscribe(response => {
      /*   for (let index = 0; index < this.tarefas.length; index++) {
          const task = this.tarefas[index];
          if (task.id == taskId) {
            this.tarefas[index] = response;
            break;
          }
        }*/
    });
  }

}
