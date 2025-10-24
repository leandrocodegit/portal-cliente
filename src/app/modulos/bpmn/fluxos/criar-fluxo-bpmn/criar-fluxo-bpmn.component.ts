import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

// BPMN-JS e Módulos relacionados
import Modeler from 'bpmn-js/lib/Modeler';
import customTranslate from './customTranslate/customTranslate';
import paletteProvider from './custom-palette';
import ColorPopupProvider from './ColorPopupProvider';
import { CamundaModdleDescriptor } from './CamundaModdleDescriptor';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, CamundaPlatformPropertiesProviderModule } from './bpmn-js-properties-panel';

// Módulos PrimeNG
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { TabsModule } from 'primeng/tabs';
import { DatePickerModule } from 'primeng/datepicker';

// Componentes e Serviços da Aplicação
import { EditToolsComponent } from './edit-tools/edit-tools.component';
import { FormularioModule } from 'src/app/shared/modules/formulario.module';
import { SeletorUsuariosComponent } from '@/modulos/usuarios/seletor-usuarios/seletor-usuarios.component';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import { formatarData } from '@/shared/services/util/DateUtil';
import { BMPN } from '../models/Diagramas';
import { keyTipoEventoEditor, TipoEventoEditor } from './tipo-evento.enum';

@Component({
  selector: 'app-criar-fluxo-bpmn',
  standalone: true,
  imports: [
    ButtonModule,
    TabsModule,
    FormularioModule,
    EditToolsComponent,
    DialogModule,
    SeletorUsuariosComponent,
    DatePickerModule,
    DrawerModule,
    FileUploadModule,
    MessageModule
  ],
  templateUrl: './criar-fluxo-bpmn.component.html',
  styleUrl: './criar-fluxo-bpmn.component.css'
})
export class CriarFluxoBpmnComponent implements OnInit, OnDestroy {
  // Propriedades mantidas como no original
  protected editorOptions = { theme: 'vs-dark', language: 'javascript' };
  protected expressao?: string;
  protected dueDate = new Date;
  protected followDate = new Date;
  protected calendar = false;
  protected viewXml = false;
  protected visible = false;
  protected viewImport = false;
  protected viewSalvar = false;
  protected loadVersao = false;
  protected tipoEventoEditor: TipoEventoEditor;
  protected element?: any;
  protected diagram: string;
  protected candidatos: Map<string, any> = new Map();
  protected assignee?: any;
  public modeler: any;
  protected formulario?: any;
  protected formId?: any;
  public state = {
    scale: 1
  };

  private subscriptions = new Subscription();

  @ViewChild('canvas', { static: true }) private canvas!: ElementRef;
  @ViewChild('properties', { static: true }) private properties!: ElementRef;
  @ViewChild('tool') private tools!: EditToolsComponent;

  constructor(
    private readonly formularioService: FormularioService,
    private readonly activeRouter: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.modeler = new Modeler({
      container: this.canvas.nativeElement,
      propertiesPanel: {
        parent: this.properties.nativeElement
      },
      additionalModules: [
        ColorPopupProvider,
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CamundaPlatformPropertiesProviderModule,
        paletteProvider,
        { translate: ['value', customTranslate] }
      ],
      moddleExtensions: {
        camunda: CamundaModdleDescriptor
      }
    });

    this.diagram = BMPN;
    this.importar(this.diagram); // Carrega o diagrama inicial

    const routeSub = this.activeRouter.params.subscribe(param => {
      this.formId = param['id'];
      if (this.formId) {
        this.buscarFormulario(this.formId, true);
      }
    });
    this.subscriptions.add(routeSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.modeler) {
      this.modeler.destroy();
    }
  }

  buscarFormulario(id?: string, recarregarVersoes?: boolean): void {
    this.formularioService.buscarFormulario(id).subscribe(response => {
      if (response.xml) {
        this.diagram = response.xml;
      }
      this.importar(this.diagram);
      if (recarregarVersoes) {
        this.formulario = response;
        this.tools.listaVersoesFormularios(response?.formularioBase?.id ?? response?.id);
      }else{
        this.location.go(`/painel/configuracoes/bpmn/config/bpmn/${id}`);
      }
    });
  }

  private async importar(xml: string): Promise<void> {
    try {
      await this.modeler.importXML(xml);
      const canvas = this.modeler.get('canvas');
      canvas.zoom('fit-viewport', 'auto');
      this.setupModelerListeners();
    } catch (error) {
      console.error('Erro ao importar o XML do BPMN.', error);
    }
  }

  private setupModelerListeners(): void {
    const eventBus = this.modeler.get('eventBus');

    eventBus.on('element.click', (event: any) => {
      const element = event.element;
      this.element = element; // Armazena o elemento clicado

      if (element.type === "bpmn:Process") {
        this.adicionarEventoProcess();
      }

      if (element.type === "bpmn:UserTask") {
        this.setupUserTaskLogic(element);
      }
    });
  }

  private setupUserTaskLogic(element: any): void {
    // Limpa e carrega dados da UserTask
    const businessObject = element.businessObject;
    this.assignee = businessObject.assignee;
    this.candidatos.clear();

    if (businessObject.candidateUsers) {
      businessObject.candidateUsers.split(',').forEach((user: string) => this.candidatos.set(user, user));
    }
    if (businessObject.candidateGroups) {
      businessObject.candidateGroups.split(',').forEach((group: string) => this.candidatos.set(group, group));
    }

    // Adiciona listeners aos botões do painel de propriedades
    // NOTA: O setTimeout continua sendo uma forma de aguardar a renderização do painel.
    setTimeout(() => {
      this.addPanelClickListener('bio-properties-panel-assignee', TipoEventoEditor.LIST_ASSIGNEE_TASK);
      this.addPanelClickListener('bio-properties-panel-candidateUsers', TipoEventoEditor.LIST_USER_TASK);
      this.addPanelClickListener('bio-properties-panel-candidateGroups', TipoEventoEditor.LIST_GROUP_TASK);

      this.addPanelClickListener('bio-properties-panel-dueDate', TipoEventoEditor.DUE_DATE_TASK, () => {
        this.parseDateProperty(businessObject.dueDate, 'dueDate');
      });

      this.addPanelClickListener('bio-properties-panel-followUpDate', TipoEventoEditor.FOLLWO_DATE_TASK, () => {
        this.parseDateProperty(businessObject.followUpDate, 'followDate');
      });
    }, 200);
  }

  private adicionarEventoProcess(): void {
    setTimeout(() => {
      this.addPanelClickListener('bio-properties-panel-candidateStarterUsers', TipoEventoEditor.LIST_USER_PROCESS);
      this.addPanelClickListener('bio-properties-panel-candidateStarterGroups', TipoEventoEditor.LIST_GROUP_PROCESS);
    }, 200);
  }

  private addPanelClickListener(elementId: string, eventType: TipoEventoEditor, preOpenCallback?: () => void): void {
    const domElement = document.getElementById(elementId);
    if (domElement) {
      domElement.onclick = () => {
        this.tipoEventoEditor = eventType;
        if (preOpenCallback) {
          preOpenCallback();
        }
        this.visible = true;
      };
    }
  }

  private parseDateProperty(dateValue: string, property: 'dueDate' | 'followDate'): void {
    if (!dateValue) return;

    if (dateValue.startsWith('${')) {
      this.expressao = dateValue;
    } else {
      this[property] = new Date(dateValue);
    }
  }

  setDate(): void {
    const modeling: any = this.modeler.get('modeling');
    const propertyKey = keyTipoEventoEditor[this.tipoEventoEditor];
    let value = (this.expressao && this.expressao.trim() !== '')
      ? this.expressao
      : formatarData(new Date(this.tipoEventoEditor === TipoEventoEditor.DUE_DATE_TASK ? this.dueDate : this.followDate));

    modeling.updateProperties(this.element, { [propertyKey]: value });
    this.visible = false;
    this.expressao = undefined; // Limpa a expressão
  }

  addCandidado(value: any): void {
    const modeling: any = this.modeler.get('modeling');

    if (this.tipoEventoEditor === TipoEventoEditor.LIST_ASSIGNEE_TASK) {
      this.assignee = value.id;
      modeling.updateProperties(this.element, { assignee: value.id });
    } else {
      const key = (this.tipoEventoEditor.includes('GROUP')) ? value.name : value.id;
      if (value.select && !this.candidatos.has(key)) {
        this.candidatos.set(key, { value: key, tipo: this.tipoEventoEditor });
      } else {
        this.candidatos.delete(key);
      }

      const propertyKey = keyTipoEventoEditor[this.tipoEventoEditor];
      const updatedValues = Array.from(this.candidatos.values())
        .filter(candidato => candidato.tipo === this.tipoEventoEditor)
        .map(candidato => candidato.value)
        .join(',');

      modeling.updateProperties(this.element, { [propertyKey]: updatedValues });
    }
  }

  async handleSave(versionar: boolean): Promise<void> {
    if (this.loadVersao) {
      return; // Previne múltiplos cliques
    }
    this.loadVersao = versionar; // Usa a flag original

    try {
      const { xml } = await this.modeler.saveXML({ format: true });
      const elementRegistry = this.modeler.get('elementRegistry');
      const processElement = elementRegistry.getAll().find((el: any) => el.type === 'bpmn:Process');

      const payload = {
        id: this.formId,
        key: processElement?.businessObject?.id,
        xml: xml,
        formularioBaseId: this.formulario?.formularioBase?.id
      };

      this.formularioService.salvarSchema(payload, 'BPMN', versionar).subscribe({
        next: (response) => {
          this.viewSalvar = false;
          if (versionar && response?.id) {
            this.buscarFormulario(response.id);
            this.tools.listaVersoesFormularios(response?.formularioBase?.id ?? response.id);
            this.location.go(`/painel/configuracoes/bpmn/config/bpmn/${response.id}`);
          }
        },
        error: (err) => {
          console.error('Erro ao salvar o schema:', err);
          this.loadVersao = false; // Reseta a flag em caso de erro
        },
        complete: () => {
          if(!versionar) { // se não for versionar, o load deve ser resetado aqui
            this.loadVersao = false;
          }
        }
      });
    } catch (error) {
      console.error('Erro ao gerar XML do BPMN:', error);
      this.loadVersao = false;
    }
  }

  handleRedo(): void {
    this.modeler.get('commandStack').redo();
  }

  handleUndo(): void {
    this.modeler.get('commandStack').undo();
  }

  async handleDownloadSvg(): Promise<void> {
    const { svg } = await this.modeler.saveSVG({ format: true });
    this.download(svg, 'diagrama.svg', 'image/svg+xml');
  }

  async handleDownloadXml(): Promise<void> {
    const { xml } = await this.modeler.saveXML({ format: true });
    this.download(xml, 'diagrama.bpmn', 'application/xml');
  }

  private download(data: string, filename: string, type: string): void {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  handleZoom(radio: number): void {
    const newScale = this.state.scale + radio;
    if (newScale >= 0.2) {
      this.modeler.get('canvas').zoom(newScale);
      this.state.scale = newScale;
    }
  }

  resetZoom(): void {
    this.modeler.get('canvas').zoom('fit-viewport', 'auto');
    this.modeler.get('canvas').zoom('fit-viewport', 'auto');
  }

  voltar(): void {
    this.router.navigate(['/painel/configuracoes/bpmn']);
  }

  importarModeloXml(event: any): void {
    const file = event?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        this.importar(content);
      }
      this.viewImport = false;
    };
    reader.readAsText(file);
  }
}
