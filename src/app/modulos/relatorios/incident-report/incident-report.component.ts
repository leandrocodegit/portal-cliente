import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

// Módulos PrimeNG
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

// Serviços e Interfaces
import { ProcessDefinitionService } from '@/shared/services/process-definition.service';

// Interface para estatísticas de definição, que inclui falhas
interface ProcessDefinitionStatistic {
  failedJobs: number;
}

// Interface para estatísticas de instância (concluídas, canceladas, etc.)
interface ProcessInstanceStatistic {
  instances: number;
  canceled: number;
  finished: number;
}

@Component({
  selector: 'app-incident-report',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    ProgressSpinnerModule,
    MessageModule,
    TooltipModule
  ],
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.scss']
})
export class IncidentReportComponent implements OnInit {

  @Input() processDefinitionIdIn?: any;
  @Input() showTitulo = false;
  @Input() showLegend = false;
  @Input() height?: any = '400px';
  // Estado da UI
  protected isLoading = true;
  protected error: string | null = null;

  // Dados para o Gráfico
  protected pieChartData: any;
  protected pieChartOptions: any;

  constructor(
    private readonly processDefinitionService: ProcessDefinitionService,
    private readonly activedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe(param => {
      const processDefinitionId = param['processDefinitionId'];
      if (processDefinitionId) {
        this.loadChartData(processDefinitionId);
      } else {
        this.error = "ID da Definição do Processo não fornecido.";
        this.isLoading = false;
      }
    });
  }

  private loadChartData(id: string): void {
    this.isLoading = true;
    this.error = null;

    forkJoin({
      // Busca dados de status de instância (ativas, finalizadas, etc.)
      instanceStats: this.processDefinitionService.getHistoryProcessStatistics(id),
      // Busca dados de definição para obter a contagem de falhas
      definitionStats: this.processDefinitionService.getProcessStatistics(id)
    }).subscribe({
      next: ({ instanceStats, definitionStats }) => {
        this.prepareInstancePieChart(instanceStats || [], definitionStats || []);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao buscar dados para o gráfico:', err);
        this.error = 'Não foi possível carregar os dados para o gráfico.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Cria um objeto de opções padrão para os gráficos de rosca.
   */
  private createDoughnutOptions(): any {
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
    return {
      cutout: '60%',
      plugins: {
        legend: {
          display: this.showLegend,
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
   * Retorna um array de cores do CSS.
   */
  private getChartColors(colorVars: string[]): string[] {
    const documentStyle = getComputedStyle(document.documentElement);
    return colorVars.map(colorVar => documentStyle.getPropertyValue(colorVar));
  }

  private prepareInstancePieChart(instanceData: ProcessInstanceStatistic[], definitionData: ProcessDefinitionStatistic[]): void {
    const totalFinished = instanceData.reduce((sum, item) => sum + item.finished, 0);
    const totalCanceled = instanceData.reduce((sum, item) => sum + item.canceled, 0);
    const totalCreated = instanceData.reduce((sum, item) => sum + item.instances, 0);
    const totalRunning = totalCreated - (totalFinished + totalCanceled);

    // Calcula o total de falhas a partir dos dados de definição
    const totalFailedJobs = definitionData.reduce((sum, item) => sum + item.failedJobs, 0);

    this.pieChartData = {
      labels: ['Ativas', 'Finalizadas', 'Canceladas', 'Com Falha'],
      datasets: [{
        data: [totalRunning, totalFinished, totalCanceled, totalFailedJobs],
        backgroundColor: this.getChartColors([
          '--p-cyan-500',
          '--p-green-500',
          '--p-gray-500',
          '--p-red-500' // Cor para falhas
        ]),
        hoverBackgroundColor: this.getChartColors([
          '--p-cyan-400',
          '--p-green-400',
          '--p-gray-400',
          '--p-red-400'
        ])
      }]
    };

    this.pieChartOptions = this.createDoughnutOptions();
  }
}

