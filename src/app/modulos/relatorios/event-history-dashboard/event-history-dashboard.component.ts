import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos PrimeNG
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

// Substitua pelo seu serviço real
import { ReportService } from '@/shared/services/report.service';
import { Top5ProcessosComponent } from '../top-5-processos/top-5-processos.component';

// Interface para os dados da API de histórico de eventos
interface ProcessEvent {
  id: string;
  type: string;
  processDefinitionKey: string;
  processInstanceId: string;
  time: string; // Formato "2025-09-27T19:20:25.000+0000"
  variableName: string;
}

@Component({
  selector: 'app-event-history-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    ProgressSpinnerModule,
    MessageModule,
    TooltipModule,
    Top5ProcessosComponent
  ],
  templateUrl: './event-history-dashboard.component.html',
  styleUrls: ['./event-history-dashboard.component.scss']
})
export class EventHistoryDashboardComponent implements OnInit {
  // Estado da UI
  protected isLoading = true;
  protected error: string | null = null;

  // Dados para os gráficos
  protected timelineChartData: any;
  protected timelineChartOptions: any;
  protected processActivityChartData: any;
  protected processActivityChartOptions: any;

  constructor(private readonly reportService: ReportService) {}

  ngOnInit(): void {
    this.loadEventHistoryData();
  }

  private loadEventHistoryData(): void {
    this.isLoading = true;
    this.error = null;

    // O serviço deve ser ajustado para buscar a lista de eventos
    this.reportService.getTaskReports().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.prepareEventTimelineChart(data);
          this.prepareProcessActivityChart(data);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao buscar histórico de eventos:', err);
        this.error = 'Não foi possível carregar os dados de histórico dos processos.';
        this.isLoading = false;
      }
    });
  }

  private prepareEventTimelineChart(data: any[]): void {
    // Agrupa os eventos por dia
    const eventsByDay = data.reduce((acc, event) => {
      const day = event.startTime.split('T')[0]; // Extrai 'AAAA-MM-DD'
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Ordena as datas para o gráfico
    const sortedDays = Object.keys(eventsByDay).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const eventCounts = sortedDays.map(day => eventsByDay[day]);

    this.timelineChartData = {
      labels: sortedDays,
      datasets: [
        {
          label: 'Eventos por Dia',
          data: eventCounts,
          fill: true,
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--p-cyan-500'),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4
        }
      ]
    };

    this.timelineChartOptions = this.getLineBarChartOptions();
  }

  private prepareProcessActivityChart(data: ProcessEvent[]): void {
    // Conta eventos por processDefinitionKey
    const eventsByProcess = data.reduce((acc, event) => {
      const key = event.processDefinitionKey;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Ordena e pega os top 5 para não poluir o gráfico
    const sortedProcesses = Object.entries(eventsByProcess)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5); // Pega os 5 processos mais ativos

    this.processActivityChartData = {
      labels: sortedProcesses.map(([key]) => key),
      datasets: [
        {
          label: 'Total de Eventos',
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
          ],
          data: sortedProcesses.map(([, count]) => count)
        }
      ]
    };

    this.processActivityChartOptions = this.getDoughnutChartOptions();
  }

  private getLineBarChartOptions(): any {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: { labels: { color: textColor } }
      },
      scales: {
        x: {
          ticks: { color: textColorSecondary, beginAtZero: true },
          grid: { color: surfaceBorder }
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder }
        }
      }
    };
  }

  private getDoughnutChartOptions(): any {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    return {
      maintainAspectRatio: false,
      aspectRatio: 1, // Proporção 1:1 é boa para gráficos de rosca
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            usePointStyle: true
          }
        }
      }
    };
  }
}

