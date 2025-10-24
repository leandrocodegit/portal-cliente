import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ProcessoService } from 'src/app/shared/services/processo.service';


@Component({
  selector: 'app-titulo-processo',
  imports: [],
  templateUrl: './titulo-processo.component.html',
  styleUrl: './titulo-processo.component.scss'
})
export class TituloProcessoComponent implements OnInit {

  protected tab = '0';
  protected processo?: any = {
    quantidadeInstanciasProcessos: 0,
    quantidadeInstanciasProcessosAtivas: 0,
  };

  constructor(
    private readonly processoService: ProcessoService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location
  ) { }


  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      if (param['tab'])
        this.tab = param['tab'];

      if (param['id']) {
        this.contarInstancias(param['id']);
        this.contarInstanciasAtivas(param['id']);
      }
    })
  }

  contarInstancias(processId: any) {
    this.processoService.quantidadeInstanciasProcessos(processId).subscribe(response => {
      this.processo.quantidadeInstanciasProcessos = response.count;
    })
  }

  contarInstanciasAtivas(processId: any) {
    this.processoService.quantidadeInstanciasAtivasProcessos(processId).subscribe(response => {
      this.processo.quantidadeInstanciasProcessosAtivas = response.count;
    })
  }
}
