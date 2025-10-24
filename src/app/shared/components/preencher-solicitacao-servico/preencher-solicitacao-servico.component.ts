import { VisaoFormularioComponent } from '@/modulos/bpmn/formularios/criar-formulario-customizado/visao-formulario/visao-formulario.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MensagemSucessoComponent } from '../mensagem-sucesso/mensagem-sucesso.component';
import { LoadComponent } from '../load/load.component';
import { LoadService } from '../preload/load.service';
import { MessageModule } from 'primeng/message';
import { PreloadComponent } from '../preload/preload.component';

@Component({
  selector: 'app-preencher-solicitacao-servico',
  imports: [
    VisaoFormularioComponent,
    MensagemSucessoComponent,
    PreloadComponent,
    MessageModule
  ],
  templateUrl: './preencher-solicitacao-servico.component.html',
  styleUrl: './preencher-solicitacao-servico.component.scss'
})
export class PreencherSolicitacaoServicoComponent {

  @Output() dataEmit = new EventEmitter();
  @Input() redirect?: any;
  @Input() servico?: any;
  @Input() formulario?: any;
  @Input() schema?: any;
  @Input() mensagem?: any;
  @Input() protocolo: any = {};
  @Input() noLoad = true;

  constructor(public readonly loadService: LoadService){}
}
