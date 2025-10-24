import { Component, Input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';
import { TagModule } from 'primeng/tag';
import { DiaSemana } from '../../models/dia-semana.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horario-atendimento',
  imports: [
    BadgeModule,
    CommonModule,
    StyleClassModule,
    TagModule
  ],
  templateUrl: './horario-atendimento.component.html',
  styleUrl: './horario-atendimento.component.scss'
})
export class HorarioAtendimentoComponent {

  @Input() dias :DiaSemana [] = [];
  @Input() horario ?:any;


  contem(dia: any){
      return this.dias.find(d => d == dia);
  }

}
