import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos PrimeNG
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

// Substitua pelo seu serviço real
import { ReportService } from '@/shared/services/report.service';

// Interface para os dados de uma métrica
interface Metric {
  timestamp: string;
  name: string;
  value: number;
}

// Interface para um cartão de KPI formatado
interface KpiCard {
  title: string;
  value: number;
  fail?: number;
  icon: string;
  colorClass: string;
  metricName: string;
  tooltip: string;
}

@Component({
  selector: 'app-metrics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ProgressSpinnerModule,
    MessageModule,
    TooltipModule
  ],
  templateUrl: './metrics-dashboard.component.html',
  styleUrls: ['./metrics-dashboard.component.scss']
})
export class MetricsDashboardComponent implements OnInit, OnDestroy {

  @Input() showTitulo = true;
  @Input() reload = false;

  // Estado da UI
  protected isLoading = true;
  protected error: string | null = null;
  protected lastUpdated: string | null = null;
  private intervalo?: any;

  // Cartões de KPI para exibição
  protected kpiCards: KpiCard[] = [];

  constructor(private readonly reportService: ReportService) { }

  ngOnInit(): void {
    this.loadMetricsHistory(true);
    if (this.reload)
      this.intervalo = setInterval(() => {
        this.loadMetricsHistory(false);
      }, 30000);
  }

  ngOnDestroy(): void {
    if (this.intervalo)
      clearInterval(this.intervalo);
  }

  private loadMetricsHistory(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.error = null;

    // Assumindo que o serviço busca o histórico de métricas
    this.reportService.getMetrics().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.prepareKpiCards(data);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao buscar histórico de métricas:', err);
        this.error = 'Não foi possível carregar o histórico de métricas do motor.';
        this.isLoading = false;
      }
    });
  }

  private prepareKpiCards(metrics: Metric[]): void {
    if (!metrics?.length) return;

    // 1. Encontra o timestamp mais recente
    const latestTimestamp = metrics.reduce(
      (max, m) => (m.timestamp > max ? m.timestamp : max),
      metrics[0].timestamp
    );
    this.lastUpdated = latestTimestamp;

    // 2. Filtra para as métricas mais recentes
    const latestMetrics = metrics.filter(m => m.timestamp === latestTimestamp);

    // 3. Agrupa métricas
    let totalJobs = 0;
    let failedJobs = 0;

    const grouped = latestMetrics.reduce((acc, m) => {
      // Normaliza grupos principais
      if (m.name.startsWith('process')) acc['process'] = (acc['process'] || 0) + m.value;
      else if (m.name.startsWith('decision')) acc['decision'] = (acc['decision'] || 0) + m.value;
      else if (m.name.startsWith('activity')) acc['activity'] = (acc['activity'] || 0) + m.value;

      // Jobs
      if (m.name.includes('job')) {
        totalJobs += m.value;

        // Verifica se é falha
        if (m.name.includes('failed') || m.name.includes('acquired-failure')) {
          failedJobs += m.value;
        }
      }

      return acc;
    }, {} as Record<string, number>);

    // 4. Monta os cartões KPI
    this.kpiCards = [
      {
        title: 'Instâncias',
        value: grouped['process'] || 0,
        icon: 'pi pi-sitemap',
        colorClass: 'text-cyan-500',
        metricName: 'process',
        tooltip: 'Número total de instâncias de processo.'
      },
      {
        title: 'Jobs',
        value: totalJobs,
        icon: 'pi pi-briefcase',
        colorClass: 'text-blue-500',
        metricName: 'job',
        tooltip: 'Total de jobs (ativos, falhados e rejeitados).'
      },
      {
        title: 'Falha',
        value: failedJobs,
        icon: 'pi pi-exclamation-triangle',
        colorClass: 'text-red-500',
        metricName: 'job-failed',
        tooltip: 'Total de jobs que falharam.'
      },/*
      {
        title: 'Decisões',
        value: grouped['decision'] || 0,
        icon: 'pi pi-sliders-h',
        colorClass: 'text-purple-500',
        metricName: 'decision',
        tooltip: 'Total de decisões DMN executadas.'
      }, */
      {
        title: 'Atividades',
        value: grouped['activity'] || 0,
        icon: 'pi pi-cog',
        colorClass: 'text-green-500',
        metricName: 'activity',
        tooltip: 'Total de atividades (flow nodes) executadas.'
      }
    ] satisfies KpiCard[];
  }

}

