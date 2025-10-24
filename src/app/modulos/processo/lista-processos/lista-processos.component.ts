import { StartProcessoComponent } from '@/modulos/bpmn/deploy/start-processo/start-processo.component';
import { LoadService } from '@/shared/components/preload/load.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ProcessoService } from 'src/app/shared/services/processo.service';

@Component({
  selector: 'app-lista-processos',
  imports: [
    TabelaComponent,
    TituloPesquisaComponent,
    DialogModule,
    DatePickerModule,
    FormsModule,
    CheckboxModule,
    ButtonModule
  ],
  templateUrl: './lista-processos.component.html',
  styleUrl: './lista-processos.component.scss'
})
export class ListaProcessosComponent implements OnInit {

  protected deployId?: any;
  protected cols: any = [
    { header: '#', field: 'suspended', isRun: true, isNot: true },
    { header: 'Nome', field: 'name' },
    { header: 'Descrição', field: 'description' },
    { header: 'Duração registros (dias)', field: 'historyTimeToLive' },
    { header: 'Suspenso', field: 'suspended', isNot: true },
    { header: 'Versão', field: 'version' },
    { header: 'Key', field: 'key' }
  ]
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  @Input() processos: any[] = [];
  protected ref: DynamicDialogRef | undefined;


  constructor(
    private readonly processoService: ProcessoService,
    private readonly activedRoute: ActivatedRoute,
    private readonly dialogService: DialogService,
    private readonly loadService: LoadService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe(param => {
      if (param['key'])
        this.listaProcessos(param['key']);
      this.deployId = param['deployId'];
    })
  }

  listaProcessos(key: string) {
    this.processoService.listarProcessosByKey(key).subscribe(response => {
      this.processos = response;
      this.processos.forEach(it => {
        it.enabled = !it.suspended;
      })
      this.loadService.addRecent({
        id: key,
        name: key,
        descricao: 'Implantações'
      })
    });
  }

  verStatus(value: any) {
    this.router.navigate([`/painel/configuracoes/deploy/implantacoes/status`],
      { queryParams: { tipo: 'deploy/implantacoes', key: value.processKey, processDefinitionId: value.id } });
  }

  start(value: any) {
    this.ref = this.dialogService.open(StartProcessoComponent, {
      data: {
        deployId: this.deployId,
        allProcess: false,
        isProcess: true,
        immediately: true,
        suspended: false,
        includeProcessInstances: false,
        processId: value.id,
        processDefinitionKey: value.key,
        executionDate: new Date
      },
    });

    this.ref.onClose.subscribe((data) => {
      for (let index = 0; index < this.processos.length; index++) {
        if (this.processos[index].id == data.id) {
          this.processos[index] = data;
        }
      };
    })
  }

}
