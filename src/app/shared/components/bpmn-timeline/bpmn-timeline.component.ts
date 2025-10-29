import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '@/base/services/layout.service';

interface TimelineStepInput {
  id: string;
  nome: string;
  description: string;
  taskState: 'COMPLETED' | 'Created' | string | null;
  duration: number | null;
  assignee: string | null;
  endTime: string | null;
  type: string
}

interface CustomTimelineEvent {
  label: string;
  status?: 'COMPLETED' | 'ACTIVE' | 'PENDING';
  date?: string;
  icon?: string;
  color?: string;
  description?: string;
}

@Component({
  selector: 'app-bpmn-timeline',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TimelineModule,
    TooltipModule,
    TagModule,
    ButtonModule,
    DatePipe
  ],
  templateUrl: './bpmn-timeline.component.html',
  styleUrls: ['./bpmn-timeline.component.scss']
})
export class BpmnTimelineComponent implements OnInit, OnChanges {

  @Input() processSteps: TimelineStepInput[] = [];
  @Input() vertical = false;
  @Input() layout:any = 'horizontal';

  protected timelineEvents: CustomTimelineEvent[] = [];

  private statusIconService: Record<string, any> = {
    COMPLETED: { icon: 'pi pi-check', iconTag: 'pi pi-check', color: '#4CAF50', label: 'Concluída', severity: 'success' },
    ACTIVE: { icon: 'pi pi-spin pi-sync', iconTag: 'pi pi-spin pi-sync', color: '#f19c2bff', load: true, label: 'Em Processamento', severity: 'warn' },
    PENDING: { icon: 'pi pi-circle-off', color: '#9E9E9E', label: 'Aguardando Processamento', severity: 'secondary' },
  };

  private statusIconTask: Record<string, any> = {
    COMPLETED: { icon: 'pi pi-check', iconTag: 'pi pi-check', color: '#4CAF50', label: 'Concluída', severity: 'success' },
    ACTIVE: { icon: 'pi pi-users', color: '#2196F3', label: 'Em Andamento', severity: 'info' },
    PENDING: { icon: 'pi pi-times', color: '#9E9E9E', label: 'Pendente', severity: 'secondary' },
  };

  constructor(
    public readonly layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    if (this.processSteps && this.processSteps.length > 0) {
      this.timelineEvents = this.createTimelineEvents(this.processSteps);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['processSteps'] && changes['processSteps'].currentValue) {
      const steps = changes['processSteps'].currentValue;
      if (steps && steps.length > 0) {
        this.timelineEvents = this.createTimelineEvents(steps);
      } else {
        this.timelineEvents = [];
      }
    }
  }

  private createTimelineEvents(steps: TimelineStepInput[]): CustomTimelineEvent[] {
    let activeStepFound = false;

    return steps.map((step) => {
      let status: 'COMPLETED' | 'ACTIVE' | 'PENDING';
      let date: string | undefined = undefined;

      if (step.taskState === 'COMPLETED') {
        status = 'COMPLETED';
        date = step.endTime;
      } else if (step.taskState && step.taskState !== 'COMPLETED' && !activeStepFound) {
        status = 'ACTIVE';
        activeStepFound = true;
      } else {
        status = 'PENDING';
      }

      const event: CustomTimelineEvent = {
        label: step.nome,
        status: status,
        date: date,
        icon: step?.type?.toLowerCase().includes('service') ? this.statusIconService[status] : this.statusIconTask[status],
        description: step.description
      };
      return event;
    });
  }
}

