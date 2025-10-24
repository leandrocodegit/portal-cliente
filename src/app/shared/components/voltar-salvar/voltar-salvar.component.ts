import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-voltar-salvar',
  imports: [
    ButtonModule
  ],
  templateUrl: './voltar-salvar.component.html',
  styleUrl: './voltar-salvar.component.scss'
})
export class VoltarSalvarComponent {

  @Output() salvarEmit = new EventEmitter();
  @Output() visualizarEmit = new EventEmitter();
  @Output() voltarEmit = new EventEmitter();
  @Input() disable = false;
  @Input() view = false;
  @Input() cancel = false;
  @Input() viewCancel = true;
  @Input() label?: any;

  constructor(private location: Location) {}

  voltar(){
    if(this.cancel)
      this.voltarEmit.emit();
    else
    this.location.back();
  }

  salvar(){
    this.salvarEmit.emit();
  }

  visualizar(){
    this.visualizarEmit.emit();
  }

}
