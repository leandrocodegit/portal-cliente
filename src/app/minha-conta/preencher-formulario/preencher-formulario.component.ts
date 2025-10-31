import { VisaoFormularioComponent } from '@/modulos/bpmn/formularios/criar-formulario-customizado/visao-formulario/visao-formulario.component';
import { LoadService } from '@/shared/components/preload/load.service';
import { PublicoService } from '@/shared/services/publicos.service';
import { formatarDataForm } from '@/shared/services/util/DateUtil';
import { Location } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-preencher-formulario',
  imports: [
    MessageModule,
    VisaoFormularioComponent
  ],
  templateUrl: './preencher-formulario.component.html',
  styleUrl: './preencher-formulario.component.scss'
})
export class PreencherFormularioComponent {

  @Output() dataEmit = new EventEmitter();
  protected servico?: any;
  protected formulario?: any;
  protected schema?: any;
  protected protocolo: any = {};
  protected redirect?: string;
  protected intervalo?: any;
  protected mensagem?: any = {};
  protected variaveis?: any;
  protected tarefa?: any;

  constructor(
    private readonly publicoService: PublicoService,
    private readonly activeRoute: ActivatedRoute,
    public readonly loadService: LoadService,
    private readonly router: Router,
    private readonly location: Location) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.redirect = param['redirect'];
      if (param['tarefaId']) {
        this.buscarTarefa(param['tarefaId']);
        this.buscarFormularopTarefa(param['tarefaId']);
      }
      if (param['protocolo']) {
        this.protocolo.protocolo = {
          numeroProtocolo: param['protocolo']
        };
      } else {
        if (param['formulario'])
          this.publicoService.buscarServico(param['servico']).subscribe(response => {
            this.servico = response;
            if (param['formulario'])
              this.publicoService.buscarFormulario(param['formulario'], this.servico.usarUltimaVersao).subscribe(response => {
                this.formulario = response;
                this.schema = JSON.parse(this.formulario.schema)
              }, error => {
              });
          }, error => {
          });
      }
    });
  }

  private buscarTarefa(tarefaId: string){
    this.publicoService.buscarTarefa(tarefaId).subscribe(response => {
      this.tarefa = response;
    });
  }

  buscarFormularopTarefa(tarefaId: string) {
    this.publicoService.listaFormulariosTarefaAdicional(tarefaId).subscribe(response => {
      this.formulario = JSON.parse(response.value[0].schema);
      this.listaVariaveis(tarefaId);
    });

  }

  listaVariaveis(tarefaId: string) {
    this.publicoService.listaVariaveis(tarefaId).subscribe(response => {
      this.variaveis = response;
      this.formulario.components.forEach((element: any) => {
        if (element.type == 'datetime' || element.type == 'date' || element.type == 'Date')
          this.variaveis[element.key].value = formatarDataForm(new Date(this.variaveis[element.key]?.value))
      });
    });
  }

    private completarTarefa(){
     this.publicoService.comcluirTarefa(this.tarefa.id).subscribe();
  }

  enviarFormulario(data: any) {
    try {
      this.publicoService.resolveTarefa({
        id: this.tarefa.parentTaskId,
        processInstanceId: this.tarefa.caseInstanceId
      }, data).subscribe({
        next: () => this.completarTarefa(),
        error: err => console.error('Erro ao enviar', err)
      });

      if (data?.files?.size > 0)
        this.publicoService.anexarDocumentoFormulario({
          id: this.tarefa.parentTaskId,
          processInstanceId: this.tarefa.caseInstanceId
        }, data).subscribe(() => {
        })
    } catch (err) {
      console.error('Erro ao converter algum arquivo para base64', err);
    }
  }

  ngOnDestroy() {
    if (this.intervalo)
      clearInterval(this.intervalo);
  }
}

