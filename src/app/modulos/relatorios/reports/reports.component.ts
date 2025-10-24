import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Módulos PrimeNG
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

// Serviços da Aplicação
import { ReportService } from '@/shared/services/report.service';

// Interface para tipar a resposta da API (Opcional, mas boa prática)
interface CamundaTaskReport {
  taskName: string;
  count: number;
}

@Component({
  selector: 'app-reports',
  standalone: true, // Adicionado para componentes modernos
  imports: [
    CommonModule, // Necessário para diretivas como *ngIf
    ChartModule,
    CardModule,
    ProgressSpinnerModule,
    MessageModule
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  // Propriedades para os gráficos
  protected data: any;
  protected options: any;

  // Propriedades de controle de estado da UI
  protected isLoading = true;
  protected error: string | null = null;

  constructor(private readonly reportsService: ReportService) { }

  ngOnInit(): void {
    //this.carregarRelatorio();
  }

  private carregarRelatorio(): void {
    this.isLoading = true;
    this.error = null;

    this.reportsService.listaReports().subscribe({
      next: (reports: CamundaTaskReport[]) => {
        if (reports && reports.length > 0) {
          this.processarDadosDoRelatorio(reports);
        } else {
          // Se não houver dados, inicializa o gráfico vazio
          this.data = { labels: [], datasets: [] };
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Falha ao buscar relatório do Camunda:', err);
        this.error = 'Não foi possível carregar os dados do relatório. Tente novamente mais tarde.';
        this.isLoading = false;
      }
    });
  }

  private processarDadosDoRelatorio(reports: CamundaTaskReport[]): void {
    const labels = reports.map(report => report.taskName);
    const counts = reports.map(report => report.count);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');

    // Gera cores dinâmicas para os gráficos
    const backgroundColors = this.gerarCores(labels.length);
    const hoverBackgroundColors = this.gerarCores(labels.length, 0.8); // Cores mais claras para hover

    this.data = {
      labels: labels,
      datasets: [
        {
          label: 'Quantidade de Tarefas',
          data: counts,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroundColors,
          borderColor: documentStyle.getPropertyValue('--p-gray-700') // Borda para o gráfico de barras
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: { // Opções específicas para o gráfico de barras
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: documentStyle.getPropertyValue('--p-gray-800')
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: documentStyle.getPropertyValue('--p-gray-800')
          }
        }
      }
    };
  }

  /**
   * Gera um array de cores RGBA com base na quantidade de itens.
   * @param count A quantidade de cores a serem geradas.
   * @param alpha A transparência da cor (0 a 1).
   * @returns Um array de strings de cores RGBA.
   */
  private gerarCores(count: number, alpha = 0.6): string[] {
    const coresBase = [
      '54, 162, 235',  // blue
      '255, 99, 132',  // red
      '255, 206, 86',  // yellow
      '75, 192, 192',  // green
      '153, 102, 255', // purple
      '255, 159, 64'   // orange
    ];
    const colors = [];
    for (let i = 0; i < count; i++) {
      // Repete as cores base se houver mais dados do que cores
      colors.push(`rgba(${coresBase[i % coresBase.length]}, ${alpha})`);
    }
    return colors;
  }
}
