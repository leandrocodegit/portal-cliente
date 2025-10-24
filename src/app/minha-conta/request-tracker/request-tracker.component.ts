import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Importado para ler parâmetros da URL

// Módulos PrimeNG para a UI
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { ServicoService } from '@/shared/services/servico.service';
import { ProtocoloService } from '@/shared/services/protocolo.service';
import { AutorProtocoloService } from '../services/protocolo.service';
import { StatusTarefa, StatusTarefaDescriptions } from '@/modulos/tarefas/models/status-tarefa.enum';

interface TrackedRequest {
  id: string;
  businessKey: string;
  startTime: string;
}

interface RequestStep {
  label: string;
  status: 'COMPLETED' | 'ACTIVE' | 'PENDING';
  date?: string;
  icon: string;
  color: string;
}

interface PendingTask {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-request-tracker',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CardModule,
    TimelineModule,
    ButtonModule,
    TagModule,
    ProgressSpinnerModule,
    MessageModule,
    TooltipModule,
    TagModule
  ],
  templateUrl: './request-tracker.component.html',
  styleUrls: ['./request-tracker.component.scss']
})
export class RequestTrackerComponent implements OnInit {

  protected statusTarefaDescriptions = StatusTarefaDescriptions;
  protected isLoading = true;
  protected error: string | null = null;
  protected protocolo?: any;
  protected servico: any;
  // Dados do Pedido
  protected request: TrackedRequest | null = null;
  protected requestSteps: RequestStep[] = [];
  protected pendingTasks: PendingTask[] = [];
  protected protocoloId?: string;

  constructor(
    private readonly servicoService: ServicoService,
        private readonly autorProtocoloService: AutorProtocoloService,

    private readonly protocoloService: ProtocoloService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.protocoloId = params['protocoloId'];
      if (this.protocoloId) {
        this.loadRequestData(this.protocoloId);
      } else {
        this.error = "Nenhum pedido foi especificado para acompanhamento.";
        this.isLoading = false;
      }
    });
  }

  private loadRequestData(protocoloId: string): void {
    this.isLoading = true;
    this.error = null;

    this.autorProtocoloService.buscarProtocolo(protocoloId).subscribe(response => {
      this.protocolo = response;
      this.isLoading = false;
      this.buscarServico(this.protocolo?.servicoId)
    }, fail => this.error = 'Nenhuma informação foi encontrada!')
  }

  private buscarServico(servicoId: string): void {
    this.isLoading = true;
    this.servicoService.buscarServico(servicoId).subscribe(response => {
      this.servico = response;
      this.isLoading = false;
    })



  }

   protected getStatusSeverity(status: StatusTarefa): any {
     switch (status) {
       case StatusTarefa.ACTIVE:
         return 'info';
       case StatusTarefa.COMPLETED:
         return 'success';
       case StatusTarefa.ACTIVE:
         return 'warning';
       case StatusTarefa.SUSPENDED:
         return 'danger';
     }
   }

  protected onTaskAction(): void {
   this.router.navigate([`/tarefa/${this.protocolo?.servicoId}/${this.protocolo?.tarefa.id}`, { 'redirect': 'http://localhost:5500/lista' }]);
  }

  formatDate(){
    return 'dd/MM/yyyy HH:mm';
  }
}

