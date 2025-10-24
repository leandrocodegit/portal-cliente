import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos PrimeNG
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

// Substitua pelo seu serviço real que busca as tarefas
import { ReportService } from '@/shared/services/report.service';
import { AuthService } from '@/auth/services/auth.service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '@/shared/services/usuario.service';
import { CardModule } from 'primeng/card';
import { LayoutService } from '@/base/services/layout.service';

// Interface para os dados de uma tarefa (atendida ou não)
interface Task {
  id: string;
  processDefinitionKey: string;
  name: string;
  startTime: string; // Essencial para agrupar tarefas pendentes
  endTime: string | null; // Nulo se a tarefa não foi atendida
}

@Component({
  selector: 'app-task-report',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    ProgressSpinnerModule,
    MessageModule,
    TooltipModule,
    SelectModule,
    FormsModule,
    CardModule
  ],
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.scss']
})
export class TaskReportComponent implements OnInit {

  @Input() showTitulo = true;
  @Input() showLegend = false;
  @Input() incluirUsuario = false;
  @Input() showDescricao = true;
  @Input() height?: any = '400px';
  @Input() reload = false;
  private intervalo?: any;
  // Estado da UI
  protected isLoading = true;
  protected error: string | null = null;
  protected departamentos = [];
  protected departamentoSelect?: any;

  // Dados do Gráfico
  protected taskStatsChartData: any;
  protected taskStatsChartOptions: any;

  constructor(
    public readonly authService: AuthService,
    private readonly reportService: ReportService,
    private readonly usuarioService: UsuarioService,
    public readonly layoutService: LayoutService) { }

  ngOnInit(): void {
    this.loadTaskHistory(true);
    if (this.incluirUsuario)
      this.listaGrupos();
    if (this.reload)
      this.intervalo = setInterval(() => {
        this.loadTaskHistory(false);
      }, 30000);
  }

  ngOnDestroy(): void {
    if (this.intervalo)
      clearInterval(this.intervalo);
  }

  listaGrupos() {
    this.usuarioService.infoUsuario(this.authService.extrairIdUsuario()).subscribe(response => {
      this.departamentos = response.departamentos;
    });
  }


  protected loadTaskHistory(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.error = null;

    // Assumindo que o serviço agora busca TODAS as tarefas (concluídas e pendentes)
    this.reportService.getTaskReports(this.incluirUsuario, this.departamentoSelect?.path?.replace('/DEPARTMENT/', '')).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.prepareTaskStatsChart(data);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao buscar histórico de tarefas:', err);
        this.error = 'Não foi possível carregar o histórico de tarefas.';
        this.isLoading = false;
      }
    });
  }

  private prepareTaskStatsChart(tasks: Task[]): void {
    // Agrupa tarefas atendidas por dia (usando endTime)
    const completedTasksByDay = tasks
      .filter(task => !!task.endTime)
      .reduce((acc, task) => {
        const day = task.endTime!.split('T')[0];
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    // Agrupa tarefas não atendidas por dia (usando startTime)
    const pendingTasksByDay = tasks
      .filter(task => !task.endTime)
      .reduce((acc, task) => {
        const day = task.startTime.split('T')[0];
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    // Combina todas as datas para criar um eixo X unificado
    const allDaysSet = new Set([...Object.keys(completedTasksByDay), ...Object.keys(pendingTasksByDay)]);
    const sortedDays = Array.from(allDaysSet).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    // Mapeia as contagens para o eixo X unificado
    const completedCounts = sortedDays.map(day => completedTasksByDay[day] || 0);
    const pendingCounts = sortedDays.map(day => pendingTasksByDay[day] || 0);

    const documentStyle = getComputedStyle(document.documentElement);

    this.taskStatsChartData = {
      labels: sortedDays,
      datasets: [
        {
          label: 'Tarefas Atendidas',
          data: completedCounts,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--p-green-500'),
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          tension: 0.4
        },
        {
          label: 'Tarefas Não Atendidas (Pendentes)',
          data: pendingCounts,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--p-orange-500'),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          tension: 0.4
        }
      ]
    };
    this.setChartOptions();
  }

  private setChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    this.taskStatsChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: this.showLegend,
          labels: {
            color: textColor
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
          ticks: {
            color: textColorSecondary,
            beginAtZero: true
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }
}

