import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { Incident } from '@/shared/models/incident.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lista-incidentes',
  imports: [
    TabelaComponent
  ],
  templateUrl: './lista-incidentes.component.html',
  styleUrl: './lista-incidentes.component.scss'
})
export class ListaIncidentesComponent {

  @Input() incidentes: Incident[] = [];

  protected colsIncidente: any = [
    { header: 'Menssagem', field: 'incidentMessage' },
    { header: 'Data do incidente', field: 'createTime', isTime: true },
    { header: 'Aberto', field: 'open', isTag: true, isInvert: true },
    { header: 'Resolvido', field: 'resolved', isTag: true },
    { header: 'Atividade', field: 'failedActivityId' },
    { header: 'Tipo', field: 'incidentType' }
  ];
}
