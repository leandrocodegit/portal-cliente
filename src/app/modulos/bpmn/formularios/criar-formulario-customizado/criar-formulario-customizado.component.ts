import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormEditor } from './customForm/form-js';
import { HttpClient } from '@angular/common/http';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { VisaoFormularioComponent } from './visao-formulario/visao-formulario.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-criar-formulario-customizado',
  standalone: true,
  imports: [
    FormsModule,
    DrawerModule,
    ButtonModule,
    VisaoFormularioComponent,
    DialogModule,
    MessageModule,
    SelectModule
  ],
  templateUrl: './criar-formulario-customizado.component.html',
  styleUrl: './criar-formulario-customizado.component.scss'
})
export class CriarFormularioCustomizadoComponent implements AfterViewInit {

  protected formId?: any;
  protected drawner = { visivel: false };
  protected schema?: any;
  protected formulario?: any;
  protected importando = false;
  protected loadVersao = false;
  protected viewSalvar = false;
  protected versoes: any[] = [];
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


  @ViewChild('formEditorContainer', { static: true }) editorContainer!: ElementRef;

  private formEditor?: FormEditor;

  constructor(
    private readonly formularioService: FormularioService,
    private readonly activeRouter: ActivatedRoute,
    private http: HttpClient,
    private location: Location) { }



  ngAfterViewInit(): void {

    this.activeRouter.params.subscribe(param => {
      this.formId = param['id'];
      if (this.formId)
        this.formularioService.buscarFormulario(this.formId).subscribe(response => {
          this.formulario = response;
          this.listaVersoes(this.formId);
          this.loadFormulario();

        })
    });
  }

  loadFormulario() {
    if (!this.formulario?.schema) {
      this.formulario.schema = {
        components: [],
        type: "default",
        id: this.formulario.id,
        exporter: {
          name: "Camunda Modeler",
          version: "5.35.0"
        },
        executionPlatform: "Camunda Platform",
        executionPlatformVersion: "7.23.0",
        schemaVersion: 1
      }
    } else {
      try {
        this.formulario.schema = JSON.parse(this.formulario.schema);
      } catch (error) { }
    }
    this.initForm(this.formulario.schema);
  }

  initForm(schema: any) {
    if (!this.formEditor)
      this.formEditor = new FormEditor({
        container: this.editorContainer.nativeElement
      });

    this.formEditor.on('formField.add', (event: any) => {
      if (event.formField.type == 'endereco' && !this.importando) {
        this.importando = true;
        this.adicionarCamposEndereco(event.formField);
      }

      if (event.formField.type == 'enviar' && !this.importando) {
        this.importando = true;
      }

    });

    this.formEditor.importSchema(schema).then(() => {
      console.log('Schema importado com sucesso.');
    });
  }

  listaVersoes(id: string) {
    this.formularioService.listaVersoesFormularios(id, true).subscribe(response => {
      this.versoes = response;
    });
  }


  adicionarBotoes() {

    const currentSchema = this.formEditor.getSchema();
    this.schema = currentSchema;

    if (!this.schema.components.find(field => field.type == 'enviar'))
      this.schema.components.push({
        "type": "enviar",
        components: [
          {
            "label": "Voltar",
            "action": "submit",
            "subaction": "back",
            "type": "button"
          },
          {
            "label": "Limpar",
            "action": "reset",
            "subaction": "reset",
            "type": "button"
          },
          {
            "label": "Enviar",
            "action": "submit",
            "subaction": "submit",
            "type": "button"
          }
        ]
      })


    var intevalor = setInterval(() => {
      this.formEditor.importSchema(this.schema).then(() => {
        this.importando = false;
        clearInterval(intevalor)
      });
    }, 100);
  }


  adicionarCamposEndereco(field: any) {

    const id = field.id;
    const currentSchema = this.formEditor.getSchema();

    this.schema = currentSchema;

    let grupoEndereco = [
      {
        "label": "Cep",
        "type": "textfield",
        "subtype": "endereco",
        "referencia": id,
        "key": "cep" + id,
        "id": "cep" + id,
        "validate": {
          "required": true
        }
      },
      {
        "label": "Rua",
        "type": "textfield",
        "subtype": "endereco",
        "referencia": id,
        "key": "street" + id,
        "id": "street" + id,
        "validate": {
          "required": true
        }
      },
      {
        "label": "Número",
        "type": "textfield",
        "subtype": "endereco",
        "referencia": id,
        "validate": {
          "required": true
        }
      },
      {
        "label": "Complemento",
        "type": "textfield",
        "subtype": "endereco",
        "referencia": id,
      },
      {
        "label": "Bairro",
        "type": "textfield",
        "subtype": "endereco",
        "referencia": id,
        "key": "neighborhood" + id,
        "id": "neighborhood" + id,
        "validate": {
          "required": true
        }
      },
      {
        "label": "Estado",
        "type": "select",
        "subtype": "state",
        "referencia": id,
        "key": "state" + id,
        "id": "state" + id,
        "searchable": true,
        values: this.estados,
        "validate": {
          "required": true
        }
      },
      {
        "label": "Cidade",
        "type": "select",
        "subtype": "endereco",
        "key": "city" + id,
        "id": "city" + id,
        "searchable": true,
        "referencia": id,
        "validate": {
          "required": true
        }
      }
    ]

    let endereco = this.schema?.components?.find(end => end.id == id);
    if (endereco) {
      endereco.components = grupoEndereco;

      var intevalor = setInterval(() => {
        this.formEditor.importSchema(this.schema).then(() => {
          this.importando = false;
          clearInterval(intevalor)
        });
      }, 100);
    }
  }

  visualizar() {
    this.exportFormSchema();
    // this.adicionarBotoes();
    this.drawner.visivel = true;
  }

  salvar(versionar: boolean) {
    if (!versionar || !this.loadVersao) {
      this.loadVersao = versionar;
      const schema = this.formEditor.saveSchema();
      this.formularioService.salvarSchema({
        id: this.formId,
        key: schema.id,
        schema: JSON.stringify(schema),
        campos: schema.components.lenght,
        formularioBaseId: this.formulario?.formularioBase?.id
      }, 'FORM', versionar).subscribe(() => {
        this.viewSalvar = false;
        this.formularioService.reload.emit();
        this.loadVersao = false;
      }, error => this.loadVersao = false);
    }
  }

  download() {
    const schema = this.formEditor.saveSchema();
    const jsonString = JSON.stringify(schema, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-schema.json';
    a.click();

    URL.revokeObjectURL(url);
  }

  exportFormSchema() {
    this.schema = this.formEditor.getSchema();
    const schemaJson = JSON.stringify(this.schema, null, 2);
    // console.log(schemaJson);
  }

  voltar() {
    this.location.back()
  }

}
