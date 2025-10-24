import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos PrimeNG
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';

// Substitua pelo seu serviço real
import { ReportService } from '@/shared/services/report.service';

// Interface para os dados do relatório
interface DurationReportData {
  period: number;
  periodUnit: 'QUARTER' | 'MONTH';
  minimum: number;
  maximum: number;
  average: number;
}

@Component({
  selector: 'app-process-duration-report-perirodo',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    ProgressSpinnerModule,
    MessageModule,
    CardModule
  ],
  templateUrl: './process-duration-report-perirodo.component.html',
  styleUrl: './process-duration-report-perirodo.component.scss'
})
export class ProcessDurationReportPerirodoComponent implements OnInit {

  @Input() processDefinitionIdIn?: any;
  @Input() showTitulo = true;
  @Input() showLegend = false;
  @Input() showDescricao = true;
  @Input() height?: any = '400px';
  // Estado da UI
  protected isLoading = true;
  protected error: string | null = null;

  // Dados dos Gráficos
  protected durationChartData: any;
  protected durationChartOptions: any;
  protected doughnutChartData: any;
  protected doughnutChartOptions: any;

  constructor(private readonly reportService: ReportService) { }

  ngOnInit(): void {
    this.loadDurationReport();
  }

  private loadDurationReport(): void {
    this.isLoading = true;
    this.error = null;

    // Chame o método do seu serviço que busca os dados de relatório de duração
    this.reportService.getProcessInstanceDurationReport(this.processDefinitionIdIn).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.prepareLineChart(data);
          this.prepareDoughnutChart(data);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao buscar relatório de duração:', err);
        this.error = 'Não foi possível carregar o relatório de duração dos processos.';
        this.isLoading = false;
      }
    });
  }

  private prepareLineChart(reportData: DurationReportData[]): void {
    const labels = reportData.map(item => `${item.periodUnit === 'QUARTER' ? 'T' : ''}${item.period}`);
    const averageData = reportData.map(item => this.formatDuration(item.average));
    const minData = reportData.map(item => this.formatDuration(item.minimum));
    const maxData = reportData.map(item => this.formatDuration(item.maximum));

    const documentStyle = getComputedStyle(document.documentElement);

    this.durationChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Duração Máxima (min)',
          data: maxData,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-red-500'),
          tension: 0.4
        },
        {
          label: 'Duração Média (min)',
          data: averageData,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-blue-500'),
          borderWidth: 3, // Destaca a linha de média
          tension: 0.4
        },
        {
          label: 'Duração Mínima (min)',
          data: minData,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-green-500'),
          tension: 0.4
        }
      ]
    };

    this.setLineChartOptions();
  }

  private prepareDoughnutChart(reportData: DurationReportData[]): void {
    const labels = reportData.map(item => `${item.periodUnit === 'QUARTER' ? 'T' : ''}${item.period}`);
    const averageData = reportData.map(item => this.formatDuration(item.average));
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.doughnutChartData = {
      labels: labels,
      datasets: [
        {
          data: averageData,
          backgroundColor: [
            documentStyle.getPropertyValue('--p-blue-500'),
            documentStyle.getPropertyValue('--p-yellow-500'),
            documentStyle.getPropertyValue('--p-green-500'),
            documentStyle.getPropertyValue('--p-cyan-500'),
            documentStyle.getPropertyValue('--p-pink-500'),
            documentStyle.getPropertyValue('--p-indigo-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-blue-400'),
            documentStyle.getPropertyValue('--p-yellow-400'),
            documentStyle.getPropertyValue('--p-green-400'),
            documentStyle.getPropertyValue('--p-cyan-400'),
            documentStyle.getPropertyValue('--p-pink-400'),
            documentStyle.getPropertyValue('--p-indigo-400'),
          ]
        }
      ]
    };

    this.doughnutChartOptions = {
      cutout: '60%',
      plugins: {
        legend: {
          display: this.showLegend,
          position: 'bottom',
          labels: {
            color: textColor,
            usePointStyle: this.showLegend
          }
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                label += context.parsed + ' min (média)';
              }
              return label;
            }
          }
        }
      }
    };
  }

  /**
   * Converte a duração de milissegundos para minutos.
   * @param durationInMs Duração em milissegundos
   */
  private formatDuration(durationInMs: number): number {
    return parseFloat((durationInMs / (1000 * 60)).toFixed(2));
  }

  private setLineChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.durationChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: this.showLegend,
          position: 'bottom',
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y + ' min';
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          },
          title: {
            display: true,
            text: 'Duração (minutos)',
            color: textColorSecondary
          }
        }
      }
    };
  }
}

