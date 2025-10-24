import { Component } from '@angular/core';
import { ProcessStatusChartComponent } from '../process-status-chart/process-status-chart.component';
import { TaskReportComponent } from '../task-report/task-report.component';
import { ProcessDurationReportPerirodoComponent } from '../process-duration-report-perirodo/process-duration-report-perirodo.component';
import { TaskReportAtivosComponent } from '../task-report-ativos/task-report-ativos.component';
import { MetricsDashboardComponent } from '../metrics-dashboard/metrics-dashboard.component';
import { SystemHealthDashboardComponent } from '../system-health-dashboard/system-health-dashboard.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ProcessStatusChartComponent,
    TaskReportComponent,
    ProcessDurationReportPerirodoComponent,
    TaskReportAtivosComponent,
    MetricsDashboardComponent,
    SystemHealthDashboardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
