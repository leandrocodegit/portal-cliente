import { HistoricTask } from '@/shared/models/history-task.model';
import { voidPipe } from '@/shared/pipes/vazio.pipe';
import { IdentityService } from '@/shared/services/identity.service';
import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StatusTarefaDescriptions } from '../models/status-tarefa.enum';
import { Task } from '@/shared/models/task';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-descricao-tarefa',
  imports: [
    DatePipe,
    voidPipe,
    Message
  ],
  templateUrl: './descricao-tarefa.component.html',
  styleUrl: './descricao-tarefa.component.scss'
})
export class DescricaoTarefaComponent {

  @Input() tarefa?: Task;
  protected statusTarefaDescriptions = StatusTarefaDescriptions;

    constructor(
      public readonly identity: IdentityService
    ) {}
}
