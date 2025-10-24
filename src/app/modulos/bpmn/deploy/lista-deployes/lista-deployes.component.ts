import { ProcessStartRequest } from '@/shared/models/process-start-request.model';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { DeployFormularioService } from 'src/app/shared/services/formulario-deploy.service';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StartProcessoComponent } from '../start-processo/start-processo.component';
import { FormularioDeployComponent } from '../formulario-deploy/formulario-deploy.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-lista-deployes',
  imports: [
    TituloPesquisaComponent,
    TabelaComponent,
    DynamicDialogModule,
    DialogModule,
    FormularioDeployComponent
  ],
  templateUrl: './lista-deployes.component.html',
  styleUrl: './lista-deployes.component.scss'
})
export class ListaDeployesComponent implements OnInit {

  @Input() tipo = 'FORM';
  protected tab = '3';
  protected visible = false;
  protected deploy?: any;
  protected ref: DynamicDialogRef | undefined;
  protected viewStart = false;
  protected cols: any = [
    { header: '#', field: 'run', isRun: true },
    { header: 'Descrição', field: 'descricao' },
    { header: 'Processos', field: 'quantidadeProcessos' },
    { header: 'Ultima versão', field: 'ultimaVersao' },
    { header: 'Status implantação', field: 'implantacao' },
    { header: 'Programação', field: 'executionDate', isTime: true },
    { header: 'Data criação', field: 'createAt', isTime: true },
    { header: 'Ultima atualização', field: 'updateAt', isTime: true },
    { header: 'Key', field: 'processKey', isCopy: true },
  ]
  protected deployes = []

  constructor(
    private readonly deployFormularioService: DeployFormularioService,
    private readonly dialogService: DialogService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
  ) {
    deployFormularioService.updateProcessEmit.subscribe(() => this.listaDeployes());
   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      if (param['tab'])
        this.tab = param['tab'];
    })
    this.listaDeployes();
  }

  listaDeployes() {
    this.deployFormularioService.listaDeploys().subscribe(response => {
      this.deployes = response;
    });
  }

  refreshDeploy(event: any) {
    this.deployFormularioService.refreshDeploy(event.id).subscribe(() => {
      this.listaDeployes();
    });
  }

  editar(value: any) {
    this.deploy = value;
    this.visible = true;
  }

  novo() {
    this.deploy = {
      descricao: '',
      formularios: [],
      fluxo: {},
      decisao: {},
      bpmn: {formularioBase: {}}
    };
    this.visible = true;
  }

  configurar(value: any) {
    this.router.navigate([`/painel/configuracoes/${this.tipo.toLowerCase()}`], { queryParams: { tipo: this.tipo.toLowerCase() } });
  }

  remover(id: any) {
    this.deployFormularioService.removerDeploy(id).subscribe(() => {
      this.listaDeployes();
    })
  }

  implantar(id: any) {
    this.deployFormularioService.implantar(id).subscribe(() => {
      this.listaDeployes();
    })
  }

  visualizar(value: any) {
    this.router.navigate([`/painel/configuracoes/deploy/implantacoes/view`], { queryParams: { key: value.processKey,tipo: 'deploy/implantacoes', deployId: value.id } });
  }

  ativarInstancia(event: any) {
    this.ref = this.dialogService.open(StartProcessoComponent, {
      data: {
        deployId: event.id,
        allProcess: true,
        isProcess: true,
        immediately: false,
        suspended: false,
        includeProcessInstances: false,
        processDefinitionKey: event.processKey,
        executionDate: new Date
      },
    });
    this.deploy = event;
    this.viewStart = true;

    this.ref.onClose.subscribe((data) => {
      for (let index = 0; index < this.deployes.length; index++) {
        if (this.deployes[index].id == data.id) {
          this.deployes[index] = data;
        }
      };
    })

  }

}
