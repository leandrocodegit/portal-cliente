import { Component, Input, OnInit } from '@angular/core';
import { FormularioModule } from 'src/app/shared/modules/formulario.module';
import { VoltarSalvarComponent } from 'src/app/shared/components/voltar-salvar/voltar-salvar.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { ProtocoloService } from 'src/app/shared/services/protocolo.service';
import { ProcessoService } from 'src/app/shared/services/processo.service';
import { ProcessDefinitionService } from '@/shared/services/process-definition.service';
import { RestarProcess } from '@/shared/models/process-restart.model';
import { Servico } from '@/shared/models/servico.model';
import { MessageModule } from 'primeng/message';
import { HistoryProcessInstance } from '@/shared/models/history-process-instance.model';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { HistoryService } from '@/shared/services/history.service';
import { ServicoService } from '@/shared/services/servico.service';

@Component({
  selector: 'app-reabrir-protocolo',
  imports: [
    FormularioModule,
    VoltarSalvarComponent,
    CheckboxModule,
    SelectModule,
    MessageModule
  ],
  templateUrl: './reabrir-protocolo.component.html',
  styleUrl: './reabrir-protocolo.component.scss'
})
export class ReabrirProtocoloComponent implements OnInit {

  protected servico: Servico;
  protected servicos: any[] = [];
  protected atividades: any[] = [];
  protected trocarServico = false;
  protected restartProcess: RestarProcess = {
    processId: '',
    processInstanceIds: [],
    skipCustomListeners: true,
    skipIoMappings: false,
    initialVariables: true,
    withoutBusinessKey: false,
    activityId: '',
    instructions: [
      {
        type: 'startBeforeActivity',
        activityId: ''
      }
    ]
  }

  @Input() instancia?: HistoryProcessInstance;
  @Input() instanceId?: any;
  @Input() viewCancel = true;

  constructor(
    private readonly protocoloService: ProtocoloService,
    private readonly servicoService: ServicoService,
    private readonly historyService: HistoryService,
    private readonly processDefinitionService: ProcessDefinitionService,
    private readonly location: Location,
    private readonly activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listaServicos();
    if(this.instanceId){
      this.historyService.buscarInstancia(this.instanceId).subscribe(response => {
        this.instancia = response;
        this.carregarInstancia();
      })
    }else{
      this.carregarInstancia();
    }
  }

  private carregarInstancia(){
    console.log('Buscar', this.instanceId);

this.listaAtividades(this.instancia.processDefinitionId);
    this.restartProcess.processId = this.instancia.processDefinitionId;
    this.restartProcess.processInstanceIds.push(this.instancia?.id);
  }

  selecionarServico(event: any, reset: boolean) {
    this.servico = event.value;
    this.restartProcess.processId = reset ? this.instancia.processDefinitionId : this.servico.processId;
    this.listaAtividades(this.restartProcess.processId);
  }

  listaServicos() {
    this.servicoService.listarServicos().subscribe(response => {
      this.servicos = response;
    });
  }

  listaAtividades(processId: any) {
    this.processDefinitionService.listarActivity(processId).subscribe(response => {
      this.atividades = response;
      this.atividades?.forEach(it => {
        if (!it.nome)
          it.nome = it.description ?? it.id
      })
    });
  }

  restart() {

    if (this.trocarServico) {
      this.protocoloService.restartProtocolo(this.servico.id, this.instancia.businessKey).subscribe(response => {
      });
    } else {
      this.restartProcess.instructions[0].activityId = this.restartProcess.activityId;
      this.processDefinitionService.restarProcesso(this.restartProcess).subscribe(response => {

      });
    }
  }
}
