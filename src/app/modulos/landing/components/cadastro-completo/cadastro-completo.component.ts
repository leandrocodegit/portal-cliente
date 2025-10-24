import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-cadastro-completo',
  imports: [DividerModule, ButtonModule, RippleModule],
  templateUrl: './cadastro-completo.component.html',
  styleUrl: './cadastro-completo.component.scss'
})
export class CadastroCompletoComponent {

}
