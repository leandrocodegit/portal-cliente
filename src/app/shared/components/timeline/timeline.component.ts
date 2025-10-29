import { HistoricTask } from '@/shared/models/history-task.model';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { Component, Input, OnInit } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { TooltipModule } from 'primeng/tooltip';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { BpmnTimelineComponent } from '../bpmn-timeline/bpmn-timeline.component';

@Component({
  selector: 'app-timeline',
  imports: [
    TimelineModule,
    TooltipModule,
    OrganizationChartModule,
    BpmnTimelineComponent
  ],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit{

  @Input() instancia?: any;
  @Input()  tarefas?: any[] = [];
   @Input()  vertical = false;
  protected etapas: any[] = [];
  protected activity?: HistoricTask;
  protected org: any;

  constructor(
    private readonly instanciaService: InstanciaService
  ) { }

  ngOnInit(): void {
    this.buscarTimeLine();
  }

  buscarTimeLine() {

     this.instanciaService.fluxoOrg(this.instancia.processDefinitionId, this.instancia.id).subscribe(response => {
        this.org = response;
     })
    this.instanciaService.timeLine(this.instancia.processDefinitionId, this.instancia.id).subscribe(response => {


      if (!this.instancia?.endTime) {
        for (let index = response.length - 1; index > 0; index--) {
          var etapa = response[index];
          if (this.activity) {
            etapa.pendente = true;
            if(this.activity.taskDefinitionKey == etapa?.id)
              break;
          } else {
            etapa.pendente = !this.isConcluida(etapa?.id);
          }
        }
      }
      this.etapas = response;
    });
  }

  isConcluida(activityId: string) {
    const task = this.tarefas.find(ta => ta.taskDefinitionKey == activityId);
    if(!task)
      return false;

    if (activityId == this.etapas[this.etapas?.length - 1]?.id)
      return true
    return task?.taskState == 'COMPLETE' || task?.taskState == 'Completed';
  }
}
