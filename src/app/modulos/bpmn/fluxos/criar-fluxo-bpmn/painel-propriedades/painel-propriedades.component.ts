import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { StyleClassModule } from 'primeng/styleclass';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
@Component({
  selector: 'app-painel-propriedades',
  imports: [
    CommonModule,
    StyleClassModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    TextareaModule,
    ToggleSwitchModule,
  ],
  templateUrl: './painel-propriedades.component.html',
  styleUrl: './painel-propriedades.component.css'
})
export class PainelPropriedadesComponent implements OnInit {

  @Input() element: any;
  @Input() modeler: any;
  @Input() services: any[] = [
    { id: 1, descricao: 'Envio de email', tipo: 'bpmn:SendTask', ativo: false, itens: [] },
    { id: 2, descricao: 'Recebimento de email', tipo: 'bpmn:ReceiveTask', ativo: false, itens: [] },
    { id: 3, descricao: 'Assinar externa', tipo: 'bpmn:UserTask', ativo: false, itens: [] },
    { id: 3, descricao: 'Assinar interna', tipo: 'bpmn:UserTask', ativo: false, itens: [] },

    { id: 4, descricao: 'Calculo juros', tipo: 'bpmn:BusinessRuleTask', ativo: false, itens: [] }
  ];
  @ViewChild('icone', { static: true }) private icone!: ElementRef;
  relaoad = true
  tipoCondicional = 1; 

  protected ouvintes: any[] = [
    { ativo: true, descricao: 'Email' },
    { ativo: true, descricao: 'Push' }
  ]

  constructor(private renderer: Renderer2, private el: ElementRef) { }


  ngOnInit(): void {
    var x = this.element;
 
    console.log('X', x);
    
  }

  getIcon() {


    if (this.element) {

      switch (this.element.type) {
        case 'bpmn:EventBasedGateway': return { icon: 'bpmn-icon-gateway-eventbased', name: 'Gateway' };
        case 'bpmn:ComplexGateway': return { icon: 'bpmn-icon-gateway-complex', name: 'Gateway' };
        case 'bpmn:InclusiveGateway': return { icon: 'bpmn-icon-gateway-or', name: 'Gateway' };
        case 'bpmn:ExclusiveGateway': return { icon: 'bpmn-icon-gateway-xor', name: 'Gateway' };
        case 'bpmn:ParallelGateway': return { icon: 'bpmn-icon-gateway-parallel', name: 'Gateway' };
        case 'bpmn:StartEvent': return { icon: 'bpmn-icon-start-event-none', name: 'Evento' };
        case 'bpmn:ServiceTask': return { icon: 'bpmn-icon-service-task', name: 'Serviço' };
        case 'bpmn:ReceiveTask': return { icon: 'bpmn-icon-receive-task', name: 'Comunicação' };
        case 'bpmn:SendTask': return { icon: 'bpmn-icon-send-task', name: 'Comunicação' };
        case 'bpmn:BusinessRuleTask': return { icon: 'bpmn-icon-business-rule-task', name: 'Regra de negócio' };
        case 'bpmn:ScriptTask': return { icon: 'bpmn-icon-script-task', name: 'Script' };
        case 'bpmn:UserTask': return { icon: 'bpmn-icon-user-task', name: 'Tarefa de usuário' };
        case 'bpmn:Process': return { icon: 'bpmn-icon-process', name: 'Processo' };




      }

    }
    return { icon: 'bpmn-icon-color-picker', name: 'Painel' };
  }

  viewFormulario() {
    if (this.element?.type == undefined) {
      return false
    }
    switch (this.element.type) {
      case 'bpmn:UserTask': return true;
      case 'bpmn:ComplexGateway': return true;
      case 'bpmn:InclusiveGateway': return true;
      case 'bpmn:ExclusiveGateway': return true;
      case 'bpmn:ParallelGateway': return true;
      case 'bpmn:StartEvent': return true;

    }
    if (this.element.type.includes('Gateway')) {
      return true;
    }
    else if (this.element.type.includes('Gateway')) {
      return true;
    }
    return false;
  }

  alterarDetalhes() {
    const modeling: any = this.modeler.get('modeling');
    const moddle: any = this.modeler.get('moddle');
 

/*     if (this.element.type == 'bpmn:Process') {
      modeling.updateProperties(this.element, {
        name: this.element.name,
        id: this.element.id, 
        jobPriority: this.element.jobPriority,
      });

    } else {
      modeling.updateProperties(this.element, {
        name: this.element.name,
        id: this.element.id,
      });
    }
    if(this.element.documentation != ''){

      var documentation = moddle.create('bpmn:Documentation', {
        text: this.element.documentation
      });
      var existingDocumentation:any[] = this.element.businessObject.get('documentation') || [];

      if (existingDocumentation) {
        if(existingDocumentation.length){
          existingDocumentation= []
        }
        existingDocumentation.push(documentation);
        modeling.updateProperties(this.element, {
          documentation: existingDocumentation
        });

      }
    } */

  }

  listaServicos(){
    return this.services.filter(item => item.tipo === this.element.type);
  }

}



export interface elementEdicaoElement {
  type: string,
  id: string,
  name: string,
  documentation: string,
  historyTimeToLive: number,
  isExecutable: boolean,
  jobPriority?: number
}
