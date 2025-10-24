import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { Job } from '@/shared/models/job.model';
import { JobService } from '@/shared/services/job.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lista-jobs',
  imports: [
    TabelaComponent
  ],
  templateUrl: './lista-jobs.component.html',
  styleUrl: './lista-jobs.component.scss'
})
export class ListaJobsComponent {


  @Input() jobs: Job[] = [];
  @Output() updateEmit = new EventEmitter();

  protected cols: any = [
    { header: 'Menssagem', field: 'exceptionMessage' },
    { header: 'Tentativas', field: 'retries' },
    { header: 'Suspenso', field: 'suspended' },
    { header: 'Data', field: 'createTime', isTime: true },
    { header: 'Prazo', field: 'dueDate', isTime: true },
    { header: 'Atividade', field: 'failedActivityId' },
    { header: 'Instância', field: 'processInstanceId', isCopy: true },
  ];

  constructor(private readonly jobService: JobService) { }


  executar(value: any) {
    this.jobService.executarJob(value.id).subscribe(() => {
      this.updateEmit.emit();
    })
  }
}
