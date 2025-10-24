import { Component, OnInit } from '@angular/core';
import { VoltarSalvarComponent } from 'src/app/shared/components/voltar-salvar/voltar-salvar.component';
import { CamundaPlatformModeler as DmnModeler } from 'camunda-dmn-js';
import customTranslate from './customTranslate/translate.module';
import { StyleClassModule } from 'primeng/styleclass';
import { FormularioService } from 'src/app/shared/services/formulario.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { EditToolsComponent } from '../../../fluxos/criar-fluxo-bpmn/edit-tools/edit-tools.component';
import { DMN } from '../../../fluxos/models/Diagramas';

@Component({
  selector: 'app-criar-decisao',
  imports: [
    StyleClassModule,
    ButtonModule
  ],
  templateUrl: './criar-decisao.component.html',
  styleUrl: './criar-decisao.component.scss'
})
export class CriarDecisaoComponent implements OnInit {

  protected dmnModeler?: DmnModeler;
  protected element: any;
  protected formId?: any;
  protected decisao: any;
  public state = {
    scale: 1
  };

  constructor(
    private readonly formularioService: FormularioService,
    private readonly activeRouter: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.dmnModeler = new DmnModeler({
      container: '#canvas',
      drd: {
        propertiesPanel: {
          parent: '#properties-container',
        },
        additionalModules: [customTranslate]
      },
      propertiesPanel: {
        additionalModules: [customTranslate]
      },
      decisionTable: {
        additionalModules: [customTranslate]
      },
      literalExpression: {
        additionalModules: [customTranslate]
      }
    });

    var diagram = DMN;

    this.activeRouter.params.subscribe(param => {
      this.formId = param['id'];
      if (this.formId)
        this.formularioService.buscarFormulario(this.formId).subscribe(response => {
      this.decisao = response;
          if (response.xml)
            diagram = response.xml
          this.initDmn(diagram);
        })
    });
  }

  private initDmn(diagram: string) {
    this.dmnModeler.importXML(diagram).then(() => {

    });

    var intervalo = setTimeout(() => {
      document.querySelectorAll('[title="General"][data-title="General"]').forEach((el: any) => {
        el.title = 'Geral';
        el.setAttribute('data-title', 'Geral');
        el.textContent = 'Geral';
      });
      document.querySelectorAll('[title="Documentation"][data-title="Documentation"]').forEach((el: any) => {
        el.title = 'Documentação';
        el.setAttribute('data-title', 'Documentação');
        el.textContent = 'Documentação';
      });
      clearInterval(intervalo);
    }, 100);
  }

  private download = (type: any, data: any, name: any) => {
    let dataTrack = '';
    const a = document.createElement('a');

    switch (type) {
      case 'xml':
        dataTrack = 'bpmn';
        break;
      case 'svg':
        dataTrack = 'svg';
        break;
      default:
        break;
    }

    name = name || `diagram.${dataTrack}`;
    a.setAttribute('href', `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`);
    a.setAttribute('target', '_blank');
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`);
    a.setAttribute('download', name);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  voltar() {
    this.location.back()
  }

  salvar() {
    const definitions = this.dmnModeler.getDefinitions();
    this.dmnModeler.saveXML({ format: true }).then((result: any) => {
      this.formularioService.salvarSchema({
        id: this.formId,
        key: definitions.id,
        xml: result.xml,
        formularioBaseId: this.decisao?.formularioBase?.id
      }, 'DMN').subscribe();

    });
  }

  baixar() {
    if (this.dmnModeler)
      this.dmnModeler.saveXML({ format: true }).then((data: any) => {
        this.download('xml', data.xml, 'xml.xml');
      });
  }
}
