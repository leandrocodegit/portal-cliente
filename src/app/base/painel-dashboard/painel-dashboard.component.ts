import { Component } from '@angular/core';
import { StatsWidgetComponent } from '../stats-widget/stats-widget.component';
import { ProximasAgendasComponent } from '../proximas-agendas/proximas-agendas.component';
import { ChartModule } from 'primeng/chart';
import { LayoutService } from '../services/layout.service';
import { TaskReportComponent } from '@/modulos/relatorios/task-report/task-report.component';
import { TaskReportAtivosComponent } from '@/modulos/relatorios/task-report-ativos/task-report-ativos.component';
import { LoadService } from '@/shared/components/preload/load.service';
import { RouterModule } from '@angular/router';
import { HistoryService } from '@/shared/services/history.service';

@Component({
  selector: 'app-painel-dashboard',
  standalone: true,
  imports: [
    ChartModule,
    StatsWidgetComponent,
    ProximasAgendasComponent,
    TaskReportComponent,
    TaskReportAtivosComponent,
    RouterModule
  ],
  templateUrl: './painel-dashboard.component.html',
  styleUrl: './painel-dashboard.component.scss'
})
export class PainelDashboardComponent {

  protected pieData: any;
  protected pieOptions: any;

 protected data = {
    labels: ['No prazo', 'Vencidas'],
    datasets: [
      {
        data: [540, 325],

      }
    ]
  };

  options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: "red"
        }
      }
    }
  };

   constructor(
      public readonly layoutService: LayoutService,
      public readonly loadService: LoadService
    ) { }


  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.pieData = {
      labels: ['Concluídas', 'Pendentes'],
      datasets: [
        {
          data: [540, 325],
          backgroundColor: [documentStyle.getPropertyValue('--p-teal-500'), documentStyle.getPropertyValue('--p-rose-500'), documentStyle.getPropertyValue('--p-teal-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--p-teal-400'), documentStyle.getPropertyValue('--p-rose-400'), documentStyle.getPropertyValue('--p-teal-400')]
        }
      ]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }
}
