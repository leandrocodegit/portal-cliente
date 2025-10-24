import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Form } from '@bpmn-io/form-js';

@Component({
  selector: 'app-preview-formulario',
  imports: [],
  templateUrl: './preview-formulario.component.html',
  styleUrl: './preview-formulario.component.scss'
})
export class PreviewFormularioComponent implements OnInit {

  @ViewChild('formContainer', { static: true }) formContainer!: ElementRef;

  @Input() components: any;
  @Input() data: any;
  @Input() dataInstance?: any;

  protected schema = {
    type: 'default',
    components: [
      {
        key: 'creditor',
        label: 'Creditor',
        type: 'textfield',
        validate: {
          required: true,
        },
      },
    ],
  };

  private form!: Form;

  ngOnInit(): void {

    this.schema.components = this.components;
    this.form = new Form({
      container: this.formContainer.nativeElement
    });
    if (this.dataInstance) {
      console.log("Dados dataInstance", this.dataInstance);
      var variaveis: any = {};
      for (const key in this.data) {
        const value = this.data[key];
        if (value !== null && value !== undefined) {
          variaveis[key] = value.value;
        }
      }
      console.log("Variaveis", variaveis);
      this.form.importSchema(this.schema, variaveis);
    }
    else if (this.data) {
      console.log("Dados", this.data);
      var variaveis: any = {};
      for (const key in this.data) {
        const value = this.data[key];
        if (value !== null && value !== undefined) {
          variaveis[key] = value.value;
        }
      }
      console.log("Variaveis", variaveis);
      this.form.importSchema(this.schema, variaveis);
    } else {
      this.form.importSchema(this.schema).catch((err: any) => {
        console.error('Erro ao importar o schema do formulário:', err);
      });
    }
  }

}
