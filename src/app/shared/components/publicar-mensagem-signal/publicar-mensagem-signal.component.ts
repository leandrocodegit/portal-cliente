import { SignalService } from '@/shared/services/signal.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputText } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-publicar-mensagem-signal',
  imports: [
    FormsModule,
    SelectModule,
    FluidModule,
    ButtonModule
  ],
  templateUrl: './publicar-mensagem-signal.component.html',
  styleUrl: './publicar-mensagem-signal.component.scss'
})
export class PublicarMensagemSignalComponent implements OnInit {

  @Output() voltarEmit = new EventEmitter;
  @Input() instancia?: any;
  protected mensagem?: string;
  protected sinais: any[] = [];
  protected load = false;

  constructor(private readonly signalService: SignalService,
  ) { }

  ngOnInit(): void {
    console.log(this.instancia);

    this.listarSinais();
  }

  publicar(isSignal: boolean) {
    if (isSignal) {

    } else {
      this.signalService.publicarMensagem(this.instancia.id, this.mensagem).subscribe(() => this.voltarEmit.emit());
    }
  }

  listarSinais() {
    this.load = true;
    this.signalService.listarSinais(this.instancia?.definitionId ?? this.instancia?.processDefinitionId).subscribe(response => {
      this.sinais = response;
      this.load = false;
    }, error => this.load = false);

  }
}
