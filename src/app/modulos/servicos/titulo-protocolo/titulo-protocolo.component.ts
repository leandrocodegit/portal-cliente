import { Component, Input } from '@angular/core';
import { StatusTarefaDescriptions } from '../../tarefas/models/status-tarefa.enum';
import { DatePipe } from '@angular/common';
import { DataAnterirorPipe } from 'src/app/shared/pipes/data-atual.pipe';
import { DataPosteriorPipe } from 'src/app/shared/pipes/data-prosterior.pipe';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TooltipModule } from 'primeng/tooltip';
import { LayoutService } from '@/base/services/layout.service';
import { NumeroProtocoloComponent } from '@/shared/components/numero-protocolo/numero-protocolo.component';

@Component({
  selector: 'app-titulo-protocolo',
  imports: [
    DatePipe,
    DataAnterirorPipe,
    DataPosteriorPipe,
    ClipboardModule,
    TooltipModule,
    NumeroProtocoloComponent
  ],
  templateUrl: './titulo-protocolo.component.html',
  styleUrl: './titulo-protocolo.component.scss'
})
export class TituloProtocoloComponent {

  protected statusTarefaDescriptions = StatusTarefaDescriptions;
  @Input() instancia: any;

    constructor(
      public readonly layoutService: LayoutService,
    ) {  }

  }
