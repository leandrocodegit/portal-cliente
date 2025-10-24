import { StatusTarefaDescriptions } from '@/modulos/tarefas/models/status-tarefa.enum';
import { SkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import { HistoryService } from '@/shared/services/history.service';
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-instancias-protocolo',
  imports: [
    ButtonModule,
    DataViewModule,
    CommonModule,
    RouterModule,
    SkeletonComponent
  ],
  templateUrl: './instancias-protocolo.component.html',
  styleUrl: './instancias-protocolo.component.scss'
})
export class InstanciasProtocoloComponent implements OnInit {

  protected isLoad = false;
  protected statusTarefaDescriptions = StatusTarefaDescriptions;
  protected protocolo?: any;
  protected instancias: any[] = [];
  protected cols: any = [
    { header: 'Id', field: 'id' },
    { header: 'Nome do processo', field: 'processDefinitionName' }
  ];
  protected pagina: any;

  constructor(
    private readonly historyService: HistoryService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router
  ) { }


  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      console.log(param);

      if (param['protocolo'])
        this.listarProtocolos(param['protocolo']);
    })
  }

  listarProtocolos(protocolo: any) {
    this.isLoad = true;
    this.historyService.listarInstanciasPorProtocolo(protocolo).subscribe(response => {
      this.instancias = response;
      if (this.instancias.length == 1)
        this.router.navigate([`painel/protocolo/${this.instancias[0].businessKey}/detalhes/${this.instancias[0].id}`])
      this.isLoad = false;
    }, erro => this.isLoad = false);
  }

  visualizar(event: any) {
    console.log('Instance protocolo', event);

  }
}
