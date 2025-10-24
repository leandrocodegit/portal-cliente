import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { ListaModelosComponent } from '../lista-modelos/lista-modelos.component';
import { ListaModelosAssinaturaComponent } from '../lista-modelos-assinatura/lista-modelos-assinatura.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ListaGruposSignatariosComponent } from '@/modulos/usuarios/lista-grupos-signatarios/lista-grupos-signatarios.component';

@Component({
  selector: 'app-tabs-modelos',
  imports: [
    TabsModule,
    ListaModelosComponent,
    ListaModelosAssinaturaComponent,
    ListaGruposSignatariosComponent
  ],
  templateUrl: './tabs-modelos.component.html',
  styleUrl: './tabs-modelos.component.scss'
})
export class TabsModelosComponent implements OnInit {

  protected tab = 'documentos';
  protected idModelo: any;

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      if (param['tab'])
        this.tab = param['tab'];
      this.idModelo = param['id'];
    })
  }

  selectTab(event: any) {
    this.location.go(`/painel/modelo/${event}`);
    this.tab = event;
  }
}
