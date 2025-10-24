import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TituloDetalhesDeployComponent } from '../titulo-detalhes-deploy/titulo-detalhes-deploy.component';
import { ProcessDefinitionService } from 'src/app/shared/services/process-definition.service';
import { TimelineModule } from 'primeng/timeline';
import { FieldsetModule } from 'primeng/fieldset';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { TabelaPagindaComponent } from 'src/app/shared/components/tabela-paginada/tabela.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DeployService } from '@/shared/services/deployment.service';
import { LoadService } from '@/shared/components/preload/load.service';

@Component({
  selector: 'app-detalhes-deploy',
  imports: [
    TituloDetalhesDeployComponent,
    TimelineModule,
    FieldsetModule,
    TabelaPagindaComponent,
    RouterModule
  ],
  templateUrl: './detalhes-deploy.component.html',
  styleUrl: './detalhes-deploy.component.scss'
})
export class DetalhesDeployComponent implements OnInit {

  protected deploy?: any;
  protected process?: any;
  protected deployesSource?: any[] = [];
  protected instancias?: any[] = [];
  protected colsProtocolo: any = [
    { header: 'Protocolo', field: 'businessKey', sort: 'businessKey' },
    { header: 'Id', field: 'id', sort: 'id' },
    { header: 'Suspenso', field: 'suspended', sort: 'suspended', isTagReverse: true },
  ];
  protected pagina: any;
  protected nInstancias = 0;

  constructor(
    private readonly instanciaService: InstanciaService,
    private readonly processDefinitionService: ProcessDefinitionService,
    private readonly deployService: DeployService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly activeRoute: ActivatedRoute,
    private readonly loadService: LoadService,
    private readonly router: Router,
    private readonly location: Location
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      if (param['id'])
        this.reload(param['id']);
    })
  }

  reload(id: string) {
    this.buscarDeploy(id);
  }

  buscarDeploy(id: any) {
    this.processDefinitionService.buscarProcessByKey(id).subscribe(response => {
      this.process = response;
      this.deployService.buscarDeployment(response.deploymentId).subscribe(result => {
        this.deploy = result;
        this.countInstancias();
        this.listarInstancias();
        this.loadService.addRecent({
          id: id,
          name: this.deploy.name,
          descricao: 'Processos',
          color: 'text-purple-400'
        })
      })
    });
  }

  listaSources(source: any) {
    if (source)
      this.processDefinitionService.listarProcessoPorKey(source).subscribe(response => {
        this.deployesSource = response;
      });
  }

  paginar(event: any) {
    this.listarInstancias(event.camunda);
  }

  countInstancias() {
    this.instanciaService.countInstanciasProcessos(this.process.id).subscribe(result => {
      this.nInstancias = result.count;
      this.pagina = {
        page: {
          size: 10,
          totalElements: result.count,
          number: 0
        }
      };
    });
  }

  listarInstancias(page?: any) {
    if (!page)
      page = "&maxResults=10"
    this.instanciaService.listarInstanciasProcessos(this.process.id, page).subscribe(response => {
      this.instancias = response;
      this.listaSources(this.instancias[0]?.definitionKey)
    });
  }

  editar(event: any) {
    this.router.navigate([`/painel/configuracoes/deploy/config/processo/${event.definitionId}/detalhes/${event.id}`]);
  }

  visualizar(event: any) {
    this.router.navigate([`painel/protocolo/${event.businessKey}/detalhes/${event.id}`]);
  }

  ativarInstancia(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: event.suspended ? 'Iniciar instância?' : 'Deseja realmente interromper essa instância?',
      header: 'Confirmar ação',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        severity: event.suspended ? 'success' : 'danger',
        label: event.suspended ? 'Sim, iníciar' : 'Sim, interromper',
      },
      accept: () => {
        this.instanciaService.ativarInstancia(event.id, !event.suspended).subscribe(() => {
          this.listarInstancias();
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao iniciar o processo!' });
        })
      }
    });
  }

  voltar() {
    this.location.back();
  }
}
