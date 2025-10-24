import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// Módulos PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Tag, TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { TopBarComponent } from '@/base/top-bar/top-bar.component';
import { AutorProtocoloService } from '../services/protocolo.service';
import { StatusTarefa, StatusTarefaDescriptions } from '@/modulos/tarefas/models/status-tarefa.enum';

// Substitua pelo seu serviço real

// Interface para um resumo do pedido na lista
interface RequestSummary {
  id: string; // ID da instância do processo
  businessKey: string; // Protocolo
  processName: string;
  startTime: string;
  status: 'Em Andamento' | 'Finalizado' | 'Pendente Cliente';
}

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CardModule,
    ButtonModule,
    Tag,
    ProgressSpinnerModule,
    MessageModule,
    TooltipModule,
    RouterModule
  ],
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  // Estado da UI
  protected isLoading = true;
  protected error: string | null = null;
  protected statusTarefaDescriptions = StatusTarefaDescriptions;

  // Lista de pedidos do cliente
  protected requests: any[] = [];

  constructor(
    private readonly autorProtocoloService: AutorProtocoloService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserRequests();
  }

  private loadUserRequests(): void {
    this.isLoading = true;
    this.error = null;

    this.autorProtocoloService.listarProtocolos().subscribe(response => {
      this.requests = response.content;
      this.isLoading = false;
    })

  }

  protected viewDetails(request: any): void {
      this.router.navigate([`/detalhes/${request.protocolo.numeroProtocolo}`]);
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

  iniciarServico(tarefa: any) {
    console.log(tarefa);

    // this.router.navigate([`/tarefa/${servico.id}/${servico.formKey}`, {'redirect': 'http://localhost:5500/conta/lista'}]);
  }
}
