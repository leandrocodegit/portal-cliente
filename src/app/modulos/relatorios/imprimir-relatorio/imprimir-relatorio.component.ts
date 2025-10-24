import { Component, Input, OnInit, inject } from '@angular/core';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TieredMenu } from 'primeng/tieredmenu';
import { MenuItem } from 'primeng/api';

// Application Services - Paths adjusted to be relative
import { AuthService } from '../../../auth/services/auth.service';
import { RelatorioService } from '../../../shared/services/relatorio.service';
import { getCurrentDate } from '../../../shared/services/util/DateUtil';
import { baixar } from '@/shared/services/util/FileUtil';

// Type definitions for better type safety
type ReportType = 'instancia' | 'tarefa';
type ReportFormat = 'PDF' | 'WORD' | 'EXCEL' | 'POWER_POINT';

interface ReportConfig {
  label: string;
  type: ReportType;
  query: any;
}

@Component({

  selector: 'app-imprimir-relatorio',
  imports: [
    SplitButtonModule,
    TieredMenu,
    ButtonModule
  ],
  templateUrl: './imprimir-relatorio.component.html',
  styleUrl: './imprimir-relatorio.component.scss'
})
export class ImprimirRelatorioComponent implements OnInit {

  @Input() style: any;

  protected items: MenuItem[] = [];

  // Services are injected using Angular's inject function for a cleaner constructor
  private readonly relatorioService = inject(RelatorioService);
  private readonly authService = inject(AuthService);

  // Configuration for available report formats.
  // Adding a new format here will automatically apply it to all reports.
  private readonly reportFormats = [
    { label: 'PDF', value: 'PDF', icon: 'pi pi-file-pdf' },
    { label: 'Word', value: 'WORD', icon: 'pi pi-file-word' },
    { label: 'Excel', value: 'EXCEL', icon: 'pi pi-file-excel' },
    { label: 'Power Point', value: 'POWER_POINT', icon: 'pi pi-file-check' },
    { label: 'CSV', value: 'CSV', icon: 'pi pi-file-export' }
  ];

  // Centralized configuration for all reports.
  // To add a new report, simply add a new object to this array.
  private readonly reportConfigs: ReportConfig[] = [
    // === Relatórios de Instância ===
    {
      label: 'Todas Instâncias', type: 'instancia', query: {
        info: { titulo: 'Relatório de Instâncias de Processos', subTitulo: 'Todas Instâncias' }
      }
    },
    {
      label: 'Instâncias Ativas', type: 'instancia', query: {
        info: { titulo: 'Relatório de Instâncias de Processos', subTitulo: 'Instâncias de Processo Ativas' },
        orQueries: [{ active: true }]
      }
    },
    {
      label: 'Instâncias Suspensas', type: 'instancia', query: {
        info: { titulo: 'Relatório de Instâncias de Processos', subTitulo: 'Instâncias de Processo Suspensas' },
        orQueries: [{ suspended: true }]
      }
    },
    // === Relatórios de Tarefa ===
    {
      label: 'Todas Tarefas', type: 'tarefa', query: {
        info: { titulo: 'Relatório de Tarefas', subTitulo: 'Todas Tarefas' }
      }
    },
    {
      label: 'Tarefas Atribuídas', type: 'tarefa', query: {
        info: { titulo: 'Relatório de Tarefas', subTitulo: 'Tarefas Atribuídas' },
        assigned: true, unfinished: true
      }
    },
    {
      label: 'Tarefas Não Atribuídas', type: 'tarefa', query: {
        info: { titulo: 'Relatório de Tarefas', subTitulo: 'Tarefas Ativas e Não Atribuídas' },
        unassigned: true, unfinished: true
      }
    },
    {
      label: 'Tarefas Vencidas', type: 'tarefa', query: {
        info: { titulo: 'Relatório de Tarefas', subTitulo: 'Tarefas Vencidas' },
        taskDueDateBefore: getCurrentDate(), unfinished: true
      }
    },
    {
      label: 'Tarefas Não Finalizadas', type: 'tarefa', query: {
        info: { titulo: 'Relatório de Tarefas', subTitulo: 'Tarefas Não Finalizadas' },
        unfinished: true
      }
    }
  ];

  ngOnInit(): void {
    this.items = this.reportConfigs.map(config => this.createReportMenuItem(config));

  }

  private createReportMenuItem(config: ReportConfig): MenuItem {
    return {
      label: config.label,
      icon: 'pi pi-print',
      items: this.reportFormats.map(format => ({
        label: format.label,
        icon: format.icon,
        command: () => {
          const query = JSON.parse(JSON.stringify(config.query));
          query.info.formato = format.value;
          this.imprimirRelatorio(config.type, query);
        }
      }))
    };
  }


  private imprimirRelatorio(type: ReportType, query: any): void {
    const user = this.authService.getUserSession();
    query.info.origem = user.name;
    query.info.descricao = user.email;
    query.info.status = '- - -';

    const report$ = type === 'instancia'
      ? this.relatorioService.imprimirRelatorioInstancia(query)
      : this.relatorioService.imprimirRelatorioTarefa(query);

    report$.subscribe(data => {
      baixar(data);
    });
  }
}

