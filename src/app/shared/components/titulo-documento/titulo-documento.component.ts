import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { FilesTarefaService } from 'src/app/modulos/processo/services/files-tarefa.service';
import { TarefaService } from 'src/app/modulos/processo/services/tarefa.service';

@Component({
  selector: 'app-titulo-documento',
  imports: [
    DatePipe,
    ProgressBarModule
  ],
  templateUrl: './titulo-documento.component.html',
  styleUrl: './titulo-documento.component.scss'
})
export class TituloDocumentoComponent {

  @Input() data: any;
  @Output() addEmit = new EventEmitter;
  @Output() updateEmit = new EventEmitter;
  @Input() isInstance = false;
  protected isLoad = false;

  constructor(
    private readonly tarefaService: FilesTarefaService
  ) { }

  excluir() {
    if(this.isInstance){
    this.tarefaService.removerVariavelInstance(this.data.processInstanceId, this.data.varName).subscribe(() => {
      this.updateEmit.emit();
    });
    }else{
    this.tarefaService.removerAnexo(this.data.taskId, this.data.id).subscribe(() => {
      this.updateEmit.emit();
    });
  }
  }

  download() {
    this.isLoad = true;
    this.tarefaService.downloadAnexo(this.data.key).subscribe(file => {
      this.baixar(file, this.data.name);
      this.isLoad = false;
    }, erro => {
      this.isLoad = false;
    });
  }

  baixar(data: Blob, name: string) {
    const blob = new Blob([data], { type: data.type || 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  adicionar(){
     this.addEmit.emit();
  }
}
