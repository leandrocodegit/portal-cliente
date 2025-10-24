import { Component, OnInit } from '@angular/core';
import { ProcessInstanceFilterComponent } from '../process-instance-filter/process-instance-filter.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { CommonModule, Location } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-painel-filtro-avancado',
  imports: [
    CommonModule,
    TabsModule,
    CardModule,
    ProcessInstanceFilterComponent,
    TaskFilterComponent
  ],
  templateUrl: './painel-filtro-avancado.component.html',
  styleUrl: './painel-filtro-avancado.component.scss'
})
export class PainelFiltroAvancadoComponent implements OnInit {

  protected tab = 'instancias';

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location) { }

  ngOnInit(): void {

    this.activeRoute.queryParams.subscribe(params => {
      this.tab = params['tab'] ?? 'instancias';
    });
  }

  selectTab(value: any) {
    this.tab = value;
    console.log(value);

    this.location.go(`/painel/task/pesquisar?tab=${value}`);
  }
}
