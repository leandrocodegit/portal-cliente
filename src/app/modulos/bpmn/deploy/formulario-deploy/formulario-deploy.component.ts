import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoltarSalvarComponent } from 'src/app/shared/components/voltar-salvar/voltar-salvar.component';
import { DeployFormularioService } from 'src/app/shared/services/formulario-deploy.service';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import { DialogModule } from 'primeng/dialog';
import { SelecionarVersaoFormularioComponent } from '../../selecionar-versao-formulario/selecionar-versao-formulario.component';
import { FormularioModule } from '@/shared/modules/formulario.module';

@Component({
  selector: 'app-formulario-deploy',
  imports: [
    FormularioModule,
    VoltarSalvarComponent,
    DialogModule,
    SelecionarVersaoFormularioComponent
  ],
  templateUrl: './formulario-deploy.component.html',
  styleUrl: './formulario-deploy.component.scss'
})
export class FormularioDeployComponent implements OnInit {

  @Input() deploy?: any;
  @Output() voltarEmit = new EventEmitter;
  protected configuracaoes: any[] = [];
  protected formularios: any[] = [];
  protected versoes: any[] = [];
  protected decisoes: any[] = [];
  protected bpmns: any[] = [];
  @Input() formulariosSelect: Map<string, any> = new Map();
  protected viewFormularios = false;
  protected load = {
    bpmn: false,
    forms: false,
    dmn: false
  }

  protected cols: any = [
    { header: 'Nome', field: 'nome' },
    { header: 'Descrição', field: 'descricao' },
    { header: 'Versão', field: 'versao' },
    { header: 'Ativo', field: 'enabled' },
    { header: 'Id', field: 'key' },
  ];



  constructor(
    private readonly deployFormularioService: DeployFormularioService,
    private readonly formularioService: FormularioService,
    private readonly activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listaBpmn();
    this.listaDmn();
    this.activeRoute.params.subscribe(param => {
      if (param['id'])
        this.deployFormularioService.buscarDeploy(param['id']).subscribe(response => {
          this.deploy = response;
          this.deploy.decisao = this.deploy.formularios.find(fluxo => fluxo.tipoFormulario == 'DMN');
          this.deploy.formularios = this.deploy.formularios.filter(fluxo => fluxo.tipoFormulario == 'FORM');
          this.deploy.formularios.forEach(element => {
            this.formulariosSelect.set(element.id, element);
          });
        }, error => {
        });

    });

    if (this.deploy?.bpmn?.formularioBase?.id || this.deploy?.bpmn?.id)
      this.listaVersoes(this.deploy?.bpmn?.formularioBase?.id ?? this.deploy?.bpmn?.id);
    this.deploy.formularios.forEach(element => {
      this.formulariosSelect.set(element.id, element);
    });
  }

  atualizarBase() {
    if (!this.deploy?.bpmn?.formularioBase)
      this.deploy.bpmn.formularioBase = this.deploy?.bpmn;
  }

  atualizarVersoes() {
    if (this.deploy?.bpmn?.formularioBase?.id)
      this.listaVersoes(this.deploy?.bpmn?.formularioBase?.id);
  }

  listaVersoes(id: string) {
    this.formularioService.listaVersoesFormularios(id, true).subscribe(response => {
      this.versoes = response;
    });
  }

  listaBpmn() {
    this.load.bpmn = true;
    this.formularioService.listaFormularios('BPMN').subscribe(response => {
      this.bpmns = response;
      this.load.bpmn = false;
      this.deploy.bpmn.formularioBase = this.bpmns.find(bpmn => bpmn.id == (this.deploy?.bpmn?.formularioBase?.id ?? this.deploy?.bpmn?.id));
      this.atualizarVersoes();
    }, error => this.load.bpmn = false);
  }

  listaDmn() {
    this.load.dmn = true;
    this.formularioService.listaFormularios('DMN').subscribe(response => {
      this.decisoes = response;
      this.load.dmn = false;
    }, error => this.load.dmn = false);
  }

  getFormularios() {
    return Array.from(this.formulariosSelect.values());
  }

  salvar() {
    this.deploy.formularios = Array.from(this.formulariosSelect.values());
    if (this.deploy?.decisao?.id)
      this.deploy.formularios.push(this.deploy.decisao);
    this.deploy.bpmn.formularioBase = undefined;
    this.deployFormularioService.salvarDeploy({
      id: this.deploy?.id,
      descricao: this.deploy.descricao,
      formularios: this.deploy.formularios,
      bpmn: this.deploy.bpmn
    }).subscribe(() => {
      this.voltarEmit.emit();
    }, error => {
      this.deploy.id = undefined;
    });
  }

  fechar() {
    this.voltarEmit.emit();
  }
}
