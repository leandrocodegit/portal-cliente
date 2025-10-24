import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { TituloProcessoComponent } from '../titulo-processo/titulo-processo.component';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { ProcessoService } from 'src/app/shared/services/processo.service';

@Component({
  selector: 'app-detalhes-processo',
  imports: [
    TabsModule,
    ButtonModule,
    TituloProcessoComponent,
    TabelaComponent
  ],
  templateUrl: './detalhes-processo.component.html',
  styleUrl: './detalhes-processo.component.scss'
})
export class DetalhesProcessoComponent implements OnInit {

  protected tab = '0';
  protected processo?: any;
  protected instancias?: any;
  protected colsInstancia: any = [
    { header: 'Protocolo', field: 'businessKey' },
    { header: 'Suspenso', field: 'suspended' },
    { header: 'Finalizada', field: 'ended' },
    { header: 'Key', field: 'definitionKey' }
  ]

  constructor(
    private readonly processoService: ProcessoService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location
  ) { }


  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      if (param['tab'])
        this.tab = param['tab'];
      if (param['idProcess']) {
        this.buscarProcesso(param['idProcess']);
        this.listaInstancias(param['idProcess']);
      }
    })
  }

  buscarProcesso(processId: any) {
    this.processoService.buscarProcesso(processId).subscribe(response => {
      this.processo = response;
    });
  }

  listaInstancias(processId: any) {
    this.processoService.listarInstanciasProcessos(processId).subscribe(response => {
      this.instancias = response;
    });
  }

  selectTab(event: any) {
    this.location.go(`/painel/tarefa/detalhes/${this.processo.id}/${event}`);
    this.tab = event;
  }

  voltar() {
    this.location.back();
  }
}
