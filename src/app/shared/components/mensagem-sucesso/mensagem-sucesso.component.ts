import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensagem-sucesso',
  imports: [],
  templateUrl: './mensagem-sucesso.component.html',
  styleUrl: './mensagem-sucesso.component.scss'
})
export class MensagemSucessoComponent {

  @Input() text: any;
}
