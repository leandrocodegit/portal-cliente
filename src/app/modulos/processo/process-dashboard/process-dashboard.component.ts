import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

// Módulos PrimeNG para a UI
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

// Substitua pelo seu serviço real que busca os dados
import { ReportService } from '@/shared/services/report.service';
import { ProcessDefinitionService } from '@/shared/services/process-definition.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TituloCurtoComponent } from '@/shared/components/titulo-curto/titulo-curto.component';
import { ProcessDurationReportComponent } from '@/modulos/relatorios/process-duration-report/process-duration-report.component';
import { ProcessDurationReportPerirodoComponent } from '@/modulos/relatorios/process-duration-report-perirodo/process-duration-report-perirodo.component';
import { IncidentReportComponent } from '@/modulos/relatorios/incident-report/incident-report.component';

// --- Interfaces para garantir a tipagem dos dados da API ---
interface Incident {
  incidentType: string;
  incidentCount: number;
}

interface RawIncident {
  id: string;
  processDefinitionId: string;
  processInstanceId: string;
  incidentTimestamp: string;
  incidentType: string;
  activityId: string;
  causeIncidentId: string;
  rootCauseIncidentId: string;
  configuration: string;
  incidentMessage: string;
}

interface ProcessDefinitionStatistic {
  id: string;
  instances: number;
  failedJobs: number;
  incidents: Incident[];
}

interface ProcessInstanceStatistic {
  id: string;
  instances: number;
  canceled: number;
  finished: number;
  completeScope: number;
  openIncidents: number;
  resolvedIncidents: number;
  deletedIncidents: number;
}

@Component({
  selector: 'app-process-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    TagModule,
    ProgressSpinnerModule,
    MessageModule,
    TooltipModule,
    TituloCurtoComponent,
    ProcessDurationReportComponent,
    ProcessDurationReportPerirodoComponent,
    IncidentReportComponent
  ],
  templateUrl: './process-dashboard.component.html',
  styleUrls: ['./process-dashboard.component.scss']
})
export class ProcessDashboardComponent implements OnInit {
  // Propriedades de estado da UI
  protected isLoading = true;
  protected error: string | null = null;
  protected totalInstances = 0;
  protected totalFailedJobs = 0;
  protected totalIncidents = 0;

  // Gráfico de Pizza
  protected pieChartData: any;
  protected pieChartOptions: any;

  // Propriedades para os dados
  protected stats: ProcessDefinitionStatistic[] = [];
  protected barChartData: any;
  protected barChartOptions: any;
  protected lineChartOptions: any;
  protected lineChartData: any;
  protected processDefinitionId?: any;

  constructor(
    private readonly processDefinitionService: ProcessDefinitionService,
    private readonly activedRoute: ActivatedRoute,
    public readonly location: Location
  ) { }

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe(param => {
      if (param['processDefinitionId'])
        this.loadAllDashboardData(param['processDefinitionId']);
      this.processDefinitionId = param['processDefinitionId'];
    })
  }

  private loadAllDashboardData(id: string): void {
    this.isLoading = true;
    this.error = null;

    // Usaremos forkJoin para aguardar as duas chamadas de API do tipo Observable
    forkJoin({
      definitionStats: this.processDefinitionService.getProcessStatistics(id), // Adapte para sua chamada real
      instanceStats: this.processDefinitionService.getHistoryProcessStatistics(id),
      incidentDetails: this.processDefinitionService.getIncidentProcessDefinitions(id)  // Adapte para sua chamada real
    }).subscribe({
      next: ({ definitionStats, instanceStats, incidentDetails }) => {
        // Processa o primeiro conjunto de dados (gráfico de barras e detalhes)
        if (definitionStats && definitionStats.length > 0) {
          this.stats = definitionStats;
          this.calculateTotals(definitionStats);
          this.prepareMainBarChart(definitionStats);
        } else {
          this.stats = [];
        }

        // Processa o segundo conjunto de dados (gráfico de pizza)
        if (instanceStats && instanceStats.length > 0) {
          this.prepareInstancePieChart(instanceStats);
        }

         if (incidentDetails && incidentDetails.length > 0) {
          this.prepareIncidentLineChart(incidentDetails);
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao buscar dados do dashboard:', err);
        this.error = 'Não foi possível carregar os dados do dashboard. Tente novamente mais tarde.';
        this.isLoading = false;
      }
    });
  }

  private calculateTotals(data: ProcessDefinitionStatistic[]): void {
    this.totalInstances = data.reduce((sum, item) => sum + item.instances, 0);
    this.totalFailedJobs = data.reduce((sum, item) => sum + item.failedJobs, 0);
    this.totalIncidents = data.reduce((sum, item) =>
      sum + item.incidents.reduce((incidentSum, incident) => incidentSum + incident.incidentCount, 0), 0);
  }

  private prepareMainBarChart(data: ProcessDefinitionStatistic[]): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    const labels = data.map(stat => stat.id.split(':')[0]);
    const instancesData = data.map(stat => stat.instances);
    const failedJobsData = data.map(stat => stat.failedJobs);

    this.barChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Instâncias Ativas',
          backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
          data: instancesData
        },
        {
          label: 'Trabalhos com Falha',
          backgroundColor: documentStyle.getPropertyValue('--p-orange-500'),
          data: failedJobsData
        }
      ]
    };

    this.barChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: { labels: { color: textColor } }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: textColorSecondary, stepSize: 1 },
          grid: { color: surfaceBorder }
        },
        x: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder }
        }
      }
    };
  }

  private prepareInstancePieChart(data: ProcessInstanceStatistic[]): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    const totalFinished = data.reduce((sum, item) => sum + item.finished, 0);
    const totalCanceled = data.reduce((sum, item) => sum + item.canceled, 0);

    // Calcula as instâncias ativas a partir dos dados do gráfico de pizza
    // Subtrai finalizadas e canceladas do total de instâncias criadas.
    const totalCreated = data.reduce((sum, item) => sum + item.instances, 0);
    const totalRunning = totalCreated - (totalFinished + totalCanceled);


    this.pieChartData = {
      labels: ['Ativas', 'Finalizadas', 'Canceladas'],
      datasets: [{
        data: [totalRunning, totalFinished, totalCanceled],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-green-500'),
          documentStyle.getPropertyValue('--p-gray-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-400'),
          documentStyle.getPropertyValue('--p-green-400'),
          documentStyle.getPropertyValue('--p-gray-400')
        ]
      }]
    };

    this.pieChartOptions = {
      plugins: {
        legend: {
          labels: { color: textColor },
          position: 'bottom'
        }
      }
    };
  }

  private prepareIncidentLineChart(data: RawIncident[]): void {
    // 1. Agrega os dados: conta quantos incidentes existem para cada tipo
    const incidentCounts = data.reduce((acc, incident) => {
        acc[incident.incidentType] = (acc[incident.incidentType] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // 2. Converte o objeto de contagem em um array para o gráfico
    const aggregatedData = Object.keys(incidentCounts).map(type => ({
        incidentType: type,
        incidentCount: incidentCounts[type]
    }));

    // 3. Monta os dados do gráfico com base nos dados agregados
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.lineChartData = {
        labels: aggregatedData.map(item => item.incidentType),
        datasets: [
            {
                label: 'Contagem de Incidentes',
                data: aggregatedData.map(item => item.incidentCount),
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-teal-500'),
                tension: 0.4
            }
        ]
    };

    this.lineChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: { legend: { labels: { color: textColor } } },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: textColorSecondary, stepSize: 1 },
                grid: { color: surfaceBorder }
            },
            x: {
                ticks: { color: textColorSecondary },
                grid: { color: surfaceBorder }
            }
        }
    };
  }
}

