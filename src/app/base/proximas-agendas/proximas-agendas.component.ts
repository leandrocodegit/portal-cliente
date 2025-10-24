import { Component, OnInit } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { FiltroService } from '@/shared/services/filtro.service';
import { StatusTarefaDescriptions } from '@/modulos/tarefas/models/status-tarefa.enum';
import { Router, RouterModule } from '@angular/router';
import { IdentityService } from '@/shared/services/identity.service';
import { DataProximaVencimentoPipe } from '@/shared/pipes/data-proximo-vencimento.pipe';
import { DataVencidaPipe } from '@/shared/pipes/data-vencida.pipe';
import { Task } from '@/shared/models/task';
import { TooltipModule } from 'primeng/tooltip';
import { NumeroProtocoloComponent } from '@/shared/components/numero-protocolo/numero-protocolo.component';


@Component({
  selector: 'app-proximas-agendas',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    TagModule,
    DataProximaVencimentoPipe,
    DataVencidaPipe,
    RouterModule,
    TooltipModule,
    NumeroProtocoloComponent
  ],
  templateUrl: './proximas-agendas.component.html',
  styleUrl: './proximas-agendas.component.scss'
})
export class ProximasAgendasComponent implements OnInit {

  protected proximasTarefas: {
    id: string,
    criada: string,
    processInstanceId: string,
    data: string,
    nome: string,
    filtro: string,
    responsavel: string,
    vencimento: Date,
    description: string,
    followUp: string,
    owner?: any,
    delegationState?: any
  }[] = [
    ];

  protected statusTarefaDescriptions = StatusTarefaDescriptions;
  protected filtros: any[] = [];
  protected tarefas: Map<string, Task[]> = new Map;
  protected identity: IdentityService;

  constructor(
    private readonly filterService: FiltroService,
    private readonly identityService: IdentityService,
    private readonly router: Router
  ) {
    this.identity = identityService;
  }

  ngOnInit(): void {
    this.listaFiltros()
  }

  private listaFiltros() {
    this.filterService.listaFiltros().subscribe(response => {
      this.filtros = response.filter(fil => fil.properties.dashboard);
      if (this.filtros.length) {
        this.filtrarTarefas();
        //this.contarTarefas();
      }
    });
  }

  getFiltrosIndividuais() {
    return this.filtros.filter(filter => filter.properties.isIndividual);
  }

  getFiltrosGerais() {
    return this.filtros.filter(filter => !filter.properties.isIndividual);
  }

  contarTarefas() {
    this.filtros.forEach(filtro => {
      this.filterService.quantidadeTarefas(filtro.id).subscribe(response => {
        filtro.count = response.count;
      });
    })
  }

  filtrarTarefas() {

    this.filtros.forEach(fil => {
      this.filterService.filtrarTarefas(fil).subscribe(response => {
        response.forEach(task => {
          if (!this.proximasTarefas.find(tarefa => tarefa.id == task.id))
            this.proximasTarefas.push({
              id: task.id,
              criada: task.created,
              processInstanceId: task.processInstanceId,
              data: task.startTime,
              nome: task.name,
              filtro: fil.name,
              responsavel: task.assignee,
              vencimento: task.due,
              description: task.description,
              followUp: task.followUp,
              owner: task.owner,
              delegationState: task.delegationState
            })
        })
        this.tarefas.set(fil.id, response);
      });
    })

  }

  verTarefa(tarefa: any) {

    this.router.navigate([`painel/tarefa/detalhes/${tarefa.id}`])
  }
}
