import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-avancar',
  imports: [
    ButtonModule
  ],
  templateUrl: './avancar.component.html',
  styleUrl: './avancar.component.scss'
})
export class AvancarComponent {

  @Output() voltarEmit = new EventEmitter();
  @Output() atualEmit = new EventEmitter();
  @Output() avancarEmit = new EventEmitter();

  voltar(){
    this.voltarEmit.emit();
  }

  atual(){
    this.atualEmit.emit();
  }

  avancar(){
    this.avancarEmit.emit();
  }

}
