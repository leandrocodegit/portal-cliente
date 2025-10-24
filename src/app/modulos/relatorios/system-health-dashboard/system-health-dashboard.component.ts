import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// Módulos PrimeNG
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart'; // Adicionado para o novo gráfico
import { ReportService } from '@/shared/services/report.service';
import { LayoutService } from '@/base/services/layout.service';

// Substitua pelo seu serviço real

// --- Interfaces para os dados ---
interface SystemMetrics {
  cpuUsage: number;
  threadsLive: number;
  threadsDaemon: number; // Nova propriedade
  threadsPeak: number; // Nova propriedade
  systemCpuCount: number;
  sessionsActive: number;
  memoryMax: number;
  memoryUsed: number;
  diskTotal: number;
  diskFree: number;
}

interface HealthStatus {
  timestamp: string;
  status: number;
  error: string;
}

@Component({
  selector: 'app-system-health-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    MessageModule,
    TooltipModule,
    ChartModule, // Adicionado
    DatePipe
  ],
  templateUrl: './system-health-dashboard.component.html',
  styleUrls: ['./system-health-dashboard.component.scss']
})
export class SystemHealthDashboardComponent implements OnInit, OnDestroy {

  @Input() reload = false;
  // Estado da UI
  protected isLoading = true;
  protected error: string | null = null;

  // Dados processados para exibição
  protected metrics: Partial<SystemMetrics> = {};
  protected status: Partial<HealthStatus> = {};

  protected memoryUsagePercent = 0;
  protected diskUsagePercent = 0;

  protected memoryUsedFormatted = '';
  protected memoryMaxFormatted = '';
  protected diskUsedFormatted = '';
  protected diskTotalFormatted = '';

  // Dados para o novo gráfico de threads
  protected threadsChartData: any;
  protected threadsChartOptions: any;
  private intervalo?: any;

  constructor(
    private readonly healthService: ReportService,
    public readonly layouService: LayoutService) { }

  ngOnInit(): void {
    this.loadHealthData(true);
    if (this.reload)
      this.intervalo = setInterval(() => {
        this.loadHealthData(false);
      }, 30000);
  }

  ngOnDestroy(): void {
    if (this.intervalo)
      clearInterval(this.intervalo);
  }

  private loadHealthData(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.error = null;

    this.healthService.getSystemHealth().subscribe({
      next: (response) => {
        this.metrics = response;

        // Simula os dados de status, já que não vêm na mesma API
        this.status = {
          timestamp: new Date().toISOString(),
          status: 200,
          error: 'OK'
        };

        this.processMetrics();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao buscar dados de saúde do sistema:', err);
        this.error = 'Não foi possível carregar os dados de saúde do sistema.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Calcula percentuais e formata os valores de memória e disco.
   */
  private processMetrics(): void {
    if (this.metrics.memoryUsed && this.metrics.memoryMax) {
      this.memoryUsagePercent = Math.round((this.metrics.memoryUsed / this.metrics.memoryMax) * 100);
      this.memoryUsedFormatted = this.formatBytes(this.metrics.memoryUsed);
      this.memoryMaxFormatted = this.formatBytes(this.metrics.memoryMax);
    }

    if (this.metrics.diskTotal && this.metrics.diskFree) {
      const diskUsed = this.metrics.diskTotal - this.metrics.diskFree;
      this.diskUsagePercent = Math.round((diskUsed / this.metrics.diskTotal) * 100);
      this.diskUsedFormatted = this.formatBytes(diskUsed);
      this.diskTotalFormatted = this.formatBytes(this.metrics.diskTotal);
    }

    // Prepara o novo gráfico de threads
    if (this.metrics.threadsLive !== undefined && this.metrics.threadsDaemon !== undefined) {
      this.prepareThreadsChart(this.metrics as SystemMetrics);
    }
  }

  /**
   * Prepara os dados e opções para o gráfico de rosca de threads.
   * @param metrics Os dados completos de métricas.
   */
  private prepareThreadsChart(metrics: SystemMetrics): void {
    const userThreads = metrics.threadsLive - metrics.threadsDaemon;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.threadsChartData = {
      labels: ['Threads de Aplicação', 'Threads Daemon (serviço)', 'Pico'],
      datasets: [{
        data: [userThreads, metrics.threadsDaemon, metrics.threadsPeak],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-blue-500'),
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-orange-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-blue-400'),
          documentStyle.getPropertyValue('--p-cyan-400'),
          documentStyle.getPropertyValue('--p-purple-400')
        ],
      }]
    };

    this.threadsChartOptions = {
      cutout: '60%',
      plugins: {
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            color: textColor,
            usePointStyle: true
          }
        }
      }
    };
  }

  /**
   * Formata um valor em bytes para uma unidade legível (KB, MB, GB).
   * @param bytes O valor em bytes.
   */
  private formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

