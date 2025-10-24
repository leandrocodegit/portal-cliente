import { Component, ElementRef, Input, AfterViewInit, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormularioModule } from 'src/app/shared/modules/formulario.module';
import { Form } from '../customForm/form-js';

import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { TarefaService } from 'src/app/shared/services/tarefa.service';
import { FilesTarefaService } from 'src/app/shared/services/files-tarefa.service';
import { TypeFormDescriptions } from '../../../fluxos/models/type-form.enum';
import { InstanciaService } from '@/shared/services/process-instance.service';
import { formatarData } from '@/shared/services/util/DateUtil';
import { TypeVariableDescriptions } from '@/modulos/bpmn/fluxos/models/type-variable.enum';

@Component({
  selector: 'app-visao-formulario',
  imports: [
    FormularioModule
  ],
  templateUrl: './visao-formulario.component.html',
  styleUrl: './visao-formulario.component.css'
})
export class VisaoFormularioComponent implements OnInit, AfterViewInit {

  @Input() apenasBotaoEnviar = false;
  @Input() schema: any;
  @Input() data?: any;
  @Input() dataInstance: any[] = [];
  @Input() tarefa: any;
  @Input() drawner?: any;
  @Input() instancia?: any;
  @Input() variavel?: any;
  @Input() isInstance = false;
  @Input() isData = false;
  @Input() readonly = false;
  @Output() formEmit = new EventEmitter();
  @Output() dataEmit = new EventEmitter();
  protected form: FormGroup;
  protected typeFormDescriptions = TypeFormDescriptions;
  private tipagem: Map<string, string> = new Map();


  @ViewChild('formContainer', { static: true }) formContainer!: ElementRef;

  protected estados = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' }
  ];

  protected cidades: any[] = []

  private formEditor: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private location: Location,
    private readonly tarefaService: TarefaService,
    private readonly instanceService: InstanciaService,
    private readonly filesTarefaService: FilesTarefaService,

  ) { }

  ngOnInit(): void {


  }

  buscarIsntancia() {
    if (this.tarefa?.processInstanceId)
      this.instanceService.buscarInstancia(this.tarefa.processInstanceId).subscribe(response => {
        this.instancia = response;
      });
  }

  ngAfterViewInit(): void {
 this.adicionarBotoes();
    if (!this.instancia)
      this.buscarIsntancia();
    this.formEditor = new Form({
      container: this.formContainer.nativeElement
    });

    this.formEditor.on('submit', (event: any) => {
      this.enviarFormulario(event);
    });

    this.formEditor.on('field.updated', (event: any) => {

      if (event.field.type == 'button') {
        if (event.field.back == 'true') {
          if (this.drawner)
            this.drawner.visivel = false;
          else
            this.location.back();
        }

      } else {
        if (event.field.subtype == 'endereco') {
          this.consultaCep(event)
        } if (event.field.type == 'select' && event.field.subtype == 'state') {
          this.listaCidade({ state: event.value }, false, event.field);
        }
      }

    });

    this.makeReadonly(this.schema.components);
    var variaveis: any = {};
    if (this.data) {

      for (const key in this.data) {
        const value = this.data[key];
        if (value !== null && value !== undefined) {
          if (value.value)
            variaveis[key] = value.value;
          else variaveis[key] = value;
        }
      }
      this.formEditor.importSchema(this.schema, variaveis);
    } else if (this.dataInstance.length) {
      this.dataInstance.map(varInstance => {
        return variaveis[varInstance?.name] = varInstance?.value
      })

      this.makeReadonly(this.schema.components);
      this.schema.components = this.schema?.components.filter(comp => comp.type != 'enviar' && comp.type != 'filepicker')
      this.formEditor.importSchema(this.schema, variaveis);
    }
    else {
      this.formEditor.importSchema(this.schema);
    }
    this.carregarTipagem(this.schema.components);
  }

  private makeReadonly(components: any[]) {

    components.forEach(component => {
      component.readonly = this.readonly;
      if (component.type === 'select') {
        component.type = 'textfield';
      }

      if (component.components && Array.isArray(component.components)) {
        this.makeReadonly(component.components);
      }
    });
  }

  private carregarTipagem(components: any[]) {
    if (this.isInstance)
      return;
    components.forEach(component => {
      this.tipagem.set(component.key, TypeFormDescriptions[component.type] ?? 'String');
      if (component.components && Array.isArray(component.components)) {
        this.makeReadonly(component.components);
      }
    });
  }

  private enviarFormulario(event: any) {

    console.log(event?.files);


    var files: File[] = [];
    if (this.isInstance) {

      this.variavel.value = event.data[this.variavel.name];


      if (event?.files?.size > 0) {
        this.instanceService.anexarDocumentoFormulario(this.instancia.id, {
          data: event.data,
          files: event.files
        }, this.variavel).subscribe(() => {
          this.formEmit.emit();
        })
      }

      if (this.variavel?.type == 'Date') {
        this.variavel.value = formatarData(new Date(this.variavel.value))
      }


      if (this.variavel.type == 'Object') {
        this.variavel.value = JSON.stringify(event.data['expression_lista'].map(val => val.value))
        this.variavel['valueInfo'] = {
          objectTypeName: 'java.util.ArrayList',
          serializationDataFormat: 'application/json'
        }
      }

      this.instanceService.alterarVariavel(this.instancia.id, this.variavel).subscribe(() => {
        this.formEmit.emit();
      })

    } else if(this.isData){
        this.dataEmit.emit({
          data: event.data,
          files: event.files
        })
    }

    else {
      try {
        this.tarefaService.resolveTarefa(this.tipagem, this.tarefa, {
          data: event.data,
          files: event.files
        }).subscribe({
          next: () => console.log('Todos arquivos enviados com sucesso'),
          error: err => console.error('Erro ao enviar', err)
        });

        if (event?.files?.size > 0)
          this.filesTarefaService.anexarDocumentoFormulario(this.tarefa, {
            data: event.data,
            files: event.files
          }).subscribe(() => {
          })
      } catch (err) {
        console.error('Erro ao converter algum arquivo para base64', err);
      }
    }
  }

  findSchemaByKey(key: string) {
    return this.schema.components.find((comp: any) => comp.key === key);
  }

  consultaCep(event: any) {
    if (event.value && event.value.length == 8)
      this.http.get('https://brasilapi.com.br/api/cep/v2/' + event.value).subscribe((response: any) => {
        this.listaCidade(response, true, event.field);
      })
  }

  listaCidade(endereco: any, update: boolean, field: any) {

    if (!endereco.state) {
      let cidade = this.schema.components.find(field => field.key == "city");
      cidade.values = [];
      this.formEditor.importSchema(this.schema, this.formEditor._state.data);
      return;
    }
    this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${endereco.state}/municipios`).subscribe((response: any) => {
      let components = this.schema.components;
      let grupo = components.find(end => end.id == field.referencia);
      let referencia = grupo.components;
      let cidade = referencia.find(field => field.key == `city${field.referencia}`);
      cidade.values = response.map(city => ({ label: city.nome, value: city.nome }))

      if (update) {
        this.formEditor._state.data[`street${field.referencia}`] = endereco.street;
        this.formEditor._state.data[`neighborhood${field.referencia}`] = endereco.neighborhood;
        this.formEditor._state.data[`state${field.referencia}`] = endereco.state;
        this.formEditor._state.data[`city${field.referencia}`] = endereco.city;
      } else {
        this.formEditor._state.data[`city${field.referencia}`] = response[0].nome;
      }
      this.formEditor.importSchema(this.schema, this.formEditor._state.data);
    }, error => {

    });
  }

  adicionarBotoes() {



    if (!this.schema.components.find(field => field.type == 'enviar'))

      if (this.apenasBotaoEnviar) {
        this.schema.components.push({
          "type": "enviar",
          components: [
            {
              "label": "Enviar",
              "action": "submit",
              "type": "button"
            }
          ]
        });
      } else {
        this.schema.components.push({
          "type": "enviar",
          components: [
            {
              "label": "Voltar",
              "action": "reset",
              "type": "button",
              "back": "true",
            },
            {
              "label": "Limpar",
              "action": "reset",
              "type": "button"
            },
            {
              "label": "Enviar",
              "action": "submit",
              "type": "button"
            }
          ]
        })
      }
  }
}


