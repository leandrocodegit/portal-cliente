import { Component, Input, OnInit } from '@angular/core';
import { DeployService } from '@/shared/services/deployment.service';
import { VisaoFormularioComponent } from '../../bpmn/formularios/criar-formulario-customizado/visao-formulario/visao-formulario.component';

@Component({
  selector: 'app-lista-formulario-protocolo',
  imports: [
    VisaoFormularioComponent
  ],
  templateUrl: './lista-formulario-protocolo.component.html',
  styleUrl: './lista-formulario-protocolo.component.scss'
})
export class ListaFormularioProtocoloComponent implements OnInit {

  @Input() deploymentId: any;
  @Input() data: any[] = [];
  @Input() schemas: any[] = [];
  @Input() readonly = false;
  protected resources: any[] = [];
  protected variaveis: any[] = [];


  constructor(
    private readonly deployService: DeployService,
  ) { }

  ngOnInit(): void {
    if (this.deploymentId)
      this.listaResource();
  }

  listaResource() {
    this.deployService.listaResources(this.deploymentId).subscribe(response => {
      this.resources = response.filter(form => form.name.endsWith('.form'));
      this.resources.forEach(it => {
        this.deployService.buscarResourData(this.deploymentId, it.id).subscribe(data => {
          this.schemas.push(data);
        })
      })

    })
  }

}
