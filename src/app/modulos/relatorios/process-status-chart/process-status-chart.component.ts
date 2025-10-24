import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos PrimeNG
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

// Substitua pelo seu serviço real
import { HistoryService } from '@/shared/services/history.service';
import { ReportService } from '@/shared/services/report.service';
import { StatusTarefaDescriptions } from '@/modulos/tarefas/models/status-tarefa.enum';

// Interface para os dados da instância de processo
interface ProcessInstance {
  id: string;
  processDefinitionName: string;
  processDefinitionKey: string;
  state: 'COMPLETED' | 'ACTIVE' | 'SUSPENDED' | 'EXTERNALLY_TERMINATED' | 'INTERNALLY_TERMINATED';
}

@Component({
  selector: 'app-process-status-chart',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    ProgressSpinnerModule,
    MessageModule,
    TooltipModule
  ],
  templateUrl: './process-status-chart.component.html',
  styleUrls: ['./process-status-chart.component.scss']
})
export class ProcessStatusChartComponent implements OnInit {

  @Input() showTitulo = true;
  @Input() showLegend = false;
  @Input() showDescricao = true;
  @Input() height?: any = '400px';
  // Estado da UI
  protected isLoading = true;
  protected error: string | null = null;
  protected statusTarefaDescriptions = StatusTarefaDescriptions;

  // Dados do Gráfico
  protected statusChartData: any;
  protected statusChartOptions: any;

  // Mapeamento de status para cores para consistência visual
  private statusColors: Record<string, string> = {};

  constructor(private readonly reportService: ReportService) { }

  ngOnInit(): void {
    this.initializeStatusColors();
    this.loadProcessInstanceData();
  }

  private initializeStatusColors(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    this.statusColors = {
      'COMPLETED': documentStyle.getPropertyValue('--p-green-500'),
      'ACTIVE': documentStyle.getPropertyValue('--p-cyan-500'),
      'SUSPENDED': documentStyle.getPropertyValue('--p-orange-500'),
      'EXTERNALLY_TERMINATED': documentStyle.getPropertyValue('--p-gray-500'),
      'INTERNALLY_TERMINATED': documentStyle.getPropertyValue('--p-red-500'),
    };
  }

  private loadProcessInstanceData(): void {
    this.isLoading = true;
    this.error = null;

    // Substitua esta chamada pelo método real do seu serviço
    this.reportService.getHistoricProcessInstances().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.prepareStackedBarChart(data);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao buscar dados de instâncias de processo:', err);
        this.error = 'Não foi possível carregar os dados das instâncias.';
        this.isLoading = false;
      }
    });
  }

  private prepareStackedBarChart(instances: ProcessInstance[]): void {
    // 1. Agrega os dados: { processName: { status: count, ... }, ... }
    const aggregatedData = instances.reduce((acc, instance) => {
      const processName = instance.processDefinitionName ?? instance.processDefinitionKey;
      const state = instance.state;

      if (!acc[processName]) {
        acc[processName] = {};
      }
      acc[processName][state] = (acc[processName][state] || 0) + 1;

      return acc;
    }, {} as Record<string, Record<string, number>>);

    // 2. Extrai os nomes dos processos e todos os status únicos
    const processNames = Object.keys(aggregatedData);
    const uniqueStates = [...new Set(instances.map(inst => inst.state))];

    // 3. Cria os datasets para o gráfico, um para cada status
    const datasets = uniqueStates.map(state => ({
      label: this.statusTarefaDescriptions[state],
      backgroundColor: this.statusColors[state] || '#CCCCCC',
      data: processNames.map(name => aggregatedData[name][state] || 0)
    }));

    this.statusChartData = {
      labels: processNames,
      datasets: datasets
    };

    this.setChartOptions();
  }

  private setChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.statusChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: { mode: 'index', intersect: false },
        legend: { position: 'bottom', labels: { color: textColor } }
      },
      scales: {
        x: {
          stacked: true, // Chave para empilhar as barras
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder }
        },
        y: {
          stacked: true, // Chave para empilhar as barras
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder }
        }
      }
    };
  }
}
