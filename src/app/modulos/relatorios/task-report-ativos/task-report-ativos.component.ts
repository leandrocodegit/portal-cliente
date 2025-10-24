import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos PrimeNG
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

// Substitua pelo seu serviço real que busca as tarefas
import { ReportService } from '@/shared/services/report.service';
import { FormularioModule } from "@/shared/modules/formulario.module";

// Interface para os dados de uma tarefa
interface Task {
  id: string;
  endTime: string | null; // Nulo se a tarefa não foi concluída
}

@Component({
  selector: 'app-task-report-ativos',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    ProgressSpinnerModule,
    MessageModule,
    FormularioModule
],
  templateUrl: './task-report-ativos.component.html',
  styleUrls: ['./task-report-ativos.component.scss']
})
export class TaskReportAtivosComponent implements OnInit {
  // Estado da UI
  @Input() processDefinitionIdIn?: any;
  @Input() showTitulo = true;
  @Input() showLegend = false;
  @Input() incluirUsuario = false;
  @Input() showDescricao = true;
  @Input() height?: any = '400px';
  protected isLoading = true;
  protected error: string | null = null;

  // Dados do Gráfico
  protected pieChartData: any;
  protected pieChartOptions: any;

  constructor(private readonly reportService: ReportService) {}

  ngOnInit(): void {
    this.loadTaskStats();
  }

  private loadTaskStats(): void {
    this.isLoading = true;
    this.error = null;

    // Assumindo que o serviço busca TODAS as tarefas (concluídas e pendentes)
    this.reportService.getTaskReports(this.incluirUsuario).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const completedCount = data.filter(task => !!task.endTime).length;
          const pendingCount = data.length - completedCount;
          this.preparePieChart(completedCount, pendingCount);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao buscar estatísticas de tarefas:', err);
        this.error = 'Não foi possível carregar as estatísticas das tarefas.';
        this.isLoading = false;
      }
    });
  }

  private preparePieChart(completedCount: number, pendingCount: number): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.pieChartData = {
      labels: ['Concluídas', 'Não Concluídas'],
      datasets: [
        {
          data: [completedCount, pendingCount],
          backgroundColor: [
            documentStyle.getPropertyValue('--p-green-500'),
            documentStyle.getPropertyValue('--p-orange-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-green-400'),
            documentStyle.getPropertyValue('--p-orange-400')
          ]
        }
      ]
    };

    this.pieChartOptions = {
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
}
