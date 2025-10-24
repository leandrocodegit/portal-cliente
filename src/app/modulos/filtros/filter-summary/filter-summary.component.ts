import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// Módulos PrimeNG
import { ChipModule } from 'primeng/chip';

// Interface para um item de resumo formatado
interface SummaryItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter-summary',
  standalone: true,
  imports: [
    CommonModule,
    ChipModule
    ],
  templateUrl: './filter-summary.component.html'
})
export class FilterSummaryComponent implements OnChanges {

  @Input() filters: any = {};
  public summaryItems: SummaryItem[] = [];

  private readonly filterLabels: Record<string, string> = {
    taskId: 'ID da Tarefa',
    processInstanceId: 'ID da Instância',
    processDefinitionKey: 'Chave do Processo',
    taskName: 'Nome da Tarefa',
    taskNameLike: 'Nome da Tarefa (contém)',
    taskAssignee: 'Responsável',
    taskAssigneeLike: 'Responsável (contém)',
    finished: 'Finalizada',
    unfinished: 'Não Finalizada',
    processFinished: 'Processo Finalizado',
    processUnfinished: 'Processo Não Finalizado',
    startedAfter: 'Iniciada Após',
    startedBefore: 'Iniciada Antes',
    finishedAfter: 'Finalizada Após',
    finishedBefore: 'Finalizada Antes',
    processDefinitionId: 'ID da Definição',
    processDefinitionName: 'Nome da Definição',
    processDefinitionNameLike: 'Nome da Definição (contém)',
    processInstanceBusinessKey: 'Chave de Negócio',
    processInstanceBusinessKeyLike: 'Chave de Negócio (contém)',
    withIncidents: 'Com Incidentes',
    incidentType: 'Tipo de Incidente',
    incidentStatus: 'Status do Incidente',
    startedBy: 'Iniciada Por',
    tenantIdIn: 'Tenants',
    active: 'Ativa',
    suspended: 'Suspensa',
    completed: 'Completa'  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && changes['filters'].currentValue) {
      this.generateSummary(changes['filters'].currentValue);
    }
  }

  private generateSummary(filters: any): void {
    this.summaryItems = [];
    const datePipe = new DatePipe('en-US');

    for (const key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        const value = filters[key];

        if (key === 'orQueries' && Array.isArray(value)) {
          value.forEach(orQuery => {
            for (const orKey in orQuery) {
              if (Object.prototype.hasOwnProperty.call(orQuery, orKey)) {
                const orValue = orQuery[orKey];
                const summaryItem = this.formatFilterItem(orKey, orValue, datePipe, 'OU ');
                if (summaryItem) {
                  this.summaryItems.push(summaryItem);
                }
              }
            }
          });
        } else {
          const summaryItem = this.formatFilterItem(key, value, datePipe);
          if (summaryItem) {
            this.summaryItems.push(summaryItem);
          }
        }
      }
    }
  }


  private formatFilterItem(key: string, value: any, datePipe: DatePipe, prefix: string = 'E'): SummaryItem | null {
    const label = this.filterLabels[key];

    if (!label || (value === null || value === undefined || value === '')) {
      return null;
    }

    let formattedValue = '';

    if (typeof value === 'boolean') {
      if (value === true) {
        formattedValue = '';
      } else {
        return null;
      }
    } else if (Array.isArray(value) && value.length > 0) {
      formattedValue = value.join(', ');
    } else if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)) {
      formattedValue = datePipe.transform(value, 'dd/MM/yyyy') || value;
    } else if (typeof value !== 'boolean') {
      formattedValue = value.toString();
    }

    return { label: `${label}`, value: prefix };
  }
}

