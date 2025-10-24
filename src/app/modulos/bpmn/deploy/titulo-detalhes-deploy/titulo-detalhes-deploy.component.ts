import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-titulo-detalhes-deploy',
  imports: [
    DatePipe,
    ProgressBarModule
  ],
  templateUrl: './titulo-detalhes-deploy.component.html',
  styleUrl: './titulo-detalhes-deploy.component.scss'
})
export class TituloDetalhesDeployComponent {

  @Input() deploy: any;
  @Input() process: any;
  @Input() instancias = 0;

}
