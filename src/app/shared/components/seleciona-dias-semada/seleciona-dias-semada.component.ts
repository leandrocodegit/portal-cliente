import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-seleciona-dias-semada',
  imports: [
    CheckboxModule
  ],
  templateUrl: './seleciona-dias-semada.component.html',
  styleUrl: './seleciona-dias-semada.component.scss'
})
export class SelecionaDiasSemadaComponent {

}
