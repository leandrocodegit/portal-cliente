import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormularioModule } from 'src/app/shared/modules/formulario.module';
import { TituloCurtoComponent } from 'src/app/shared/components/titulo-curto/titulo-curto.component';
import { VoltarSalvarComponent } from 'src/app/shared/components/voltar-salvar/voltar-salvar.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { ProtocoloService } from 'src/app/shared/services/protocolo.service';
import { ProcessoService } from 'src/app/shared/services/processo.service';
import { FormularioService } from '@/shared/services/formulario.service';
import { ServicoService } from '@/shared/services/servico.service';
import { CORES, ICONS } from '@/shared/models/icons';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ListaCategoriasComponent } from '../lista-categorias/lista-categorias.component';

@Component({
  selector: 'app-formulario-servico',
  imports: [
    FormularioModule,
    TituloCurtoComponent,
    VoltarSalvarComponent,
    CheckboxModule,
    SelectModule,
    DialogModule,
    SliderModule,
    ColorPickerModule,
    ListaCategoriasComponent
  ],
  templateUrl: './formulario-servico.component.html',
  styleUrl: './formulario-servico.component.scss'
})
export class FormularioServicoComponent implements OnInit {

  @Output() voltarEmit = new EventEmitter();
  @Input() servico?: any;
  protected configuracaoes: any[] = [];
  protected deployements: Map<string, any> = new Map();
  protected processos: any[] = [];
  protected processKey: any[] = [];
  protected versoes: any[] = [];
  protected formularios: any[] = [];
  protected icons = ICONS;
  protected intensidadeCor = 400;
  protected cores = CORES;
  protected viewIcons = false;
  constructor(
    private readonly protocoloService: ProtocoloService,
    private readonly servicoService: ServicoService,
    private readonly processoService: ProcessoService,
    private readonly formularioService: FormularioService,
    private readonly location: Location,
    private readonly activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listaConfiguracaoProtocolos();
    this.listaProcessos();
    this.listaFormularios();
    this.activeRoute.params.subscribe(param => {
      if (param['id'] && !this.servico?.id)
        this.servicoService.buscarServico(param['id']).subscribe(response => {
          this.servico = response;
          if (this.servico.processDefinitionKey)
            this.listaProcessosPorKey();
        }, error => {
        });
    });

    if (!this.servico)
      this.servico = {
        nome: '',
        descricao: '',
        publico: false,
        processDefinitionKey: '',
        formKey: '',
        icon: 'room_service'
      };

  }

  listaFormularios() {
    this.formularioService.listaFormularios('FORM', true).subscribe(response => {
      this.formularios = response;
      if (this.servico?.formKey)
        this.formularios.forEach((form: any) => {
          if (!this.servico?.formulario)
            form.versoes.forEach(versao => {
              if (versao?.formularioBase && versao.id == this.servico.formKey)
                this.servico.formulario = this.formularios.find(base => base.id == versao?.formularioBase.id);
            })
        })
    });
  }

  listaConfiguracaoProtocolos() {
    this.protocoloService.listarConfiguracoesDeProtocolos().subscribe(response => {
      this.configuracaoes = response;
    });
  }

  listaProcessos() {
    this.processoService.listarProcessos().subscribe(response => {
      response.forEach(processo => {
        if (!processo?.name)
          processo.name = processo.key;
        if (this.servico.processDefinitionKey == processo.key) {
          this.servico.processo = processo;
          this.atualizarVersoes();
        }
      })

      this.processos = Array.from(
        new Map(response.map(item => [item.key, item])).values()
      );
    });
  }

  listaProcessosPorKey() {
    if (this.servico?.processo?.key)
      this.processoService.listarProcessosByKey(this.servico.processo.key).subscribe(response => {
        this.versoes = response;
        response.forEach(version => {
          if (this.servico.version == version.version) {
            this.servico.version = version;
          }
        })
      });
  }

  atualizarVersoes() {
    if (!this.servico.usarUltimaVersao)
      this.listaProcessosPorKey();
  }

  getVersoes(key: string) {
    return this.processos.filter(proc => proc.key == key)
  }

  selecionarCor(cor: string) {
    this.servico.color = cor;
    this.viewIcons = false;
  }

  selecionarIcon(icon: string) {
    this.servico.icon = icon;
    this.viewIcons = false;
  }

  salvar() {
    var versao = this.servico.processo;
    this.servico.version = versao?.version;
    if (this.servico?.usarUltimaVersao && this.versoes.length) {
      versao = this.versoes[this.versoes.length - 1];
      this.servico.version = versao?.version;
    }

    this.servico.processId = versao.id;
    this.servico.deploymentId = versao.deploymentId;
    this.servico.processDefinitionKey = versao.key;
    this.servicoService.criarServico(this.servico).subscribe(() => {
      this.voltarEmit.emit();
    }, error => {
      this.servico.id = undefined;
    });
  }
}
