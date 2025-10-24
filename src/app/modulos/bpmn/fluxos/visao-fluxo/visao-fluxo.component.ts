import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Modeler from 'bpmn-js/lib/Modeler';

@Component({
  selector: 'app-visao-fluxo',
  imports: [],
  templateUrl: './visao-fluxo.component.html',
  styleUrl: './visao-fluxo.component.scss'
})
export class VisaoFluxoComponent implements OnInit {

  @Input() xml?: any;
  @Input() tarefa?: any;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  private bpmnViewer: any;

  ngOnInit(): void {

    this.bpmnViewer = new Modeler({
      container: this.canvasRef.nativeElement,
      propertiesPanel: {},
      keyboard: { bindTo: document },
      additionalModules: [],
      moddleExtensions: {}
    });

    if (this.xml)
      this.bpmnViewer.importXML(this.xml).then(() => {
     this.bpmnViewer.get('canvas').zoom('fit-viewport');

        if (this.tarefa?.taskDefinitionKey) {
          const modeling = this.bpmnViewer.get('modeling');
          const elementRegistry = this.bpmnViewer.get('elementRegistry');

          const taskElement = elementRegistry.get(this.tarefa.taskDefinitionKey);

          if (taskElement) {
            modeling.setColor(taskElement, {
              stroke: 'white',
              fill: '#c5d400'
            });
          }

          const canvasContainer = this.canvasRef.nativeElement.querySelector('.djs-container');
          if (canvasContainer) {
            canvasContainer.style.pointerEvents = 'none';
          }
        }
      });

  }
}
