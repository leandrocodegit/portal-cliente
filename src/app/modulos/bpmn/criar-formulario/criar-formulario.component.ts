import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormularioModule } from 'src/app/shared/modules/formulario.module';
import { TituloCurtoComponent } from 'src/app/shared/components/titulo-curto/titulo-curto.component';
import { VoltarSalvarComponent } from 'src/app/shared/components/voltar-salvar/voltar-salvar.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormularioService } from 'src/app/shared/services/formulario.service';


@Component({
  selector: 'app-criar-formulario',
  imports: [
    FormularioModule,
    TituloCurtoComponent,
    VoltarSalvarComponent
  ],
  templateUrl: './criar-formulario.component.html',
  styleUrl: './criar-formulario.component.scss'
})
export class CriarFormularioComponent {

  @Output() voltarEmit = new EventEmitter;
  @Output() updateEmit = new EventEmitter;
  @Input() formulario?: any;
  constructor(
    private readonly formularioService: FormularioService,
    private readonly location: Location,
    private readonly activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      this.formulario.tipoFormulario = param['tipo'].toUpperCase();
      if (param['id']) {
        this.formularioService.buscarFormulario(param['id']).subscribe(response => {
          this.formulario = response;
        })
      }
    });

    if (!this.formulario)
      this.formulario = {
        nome: '',
        descricao: '',
        tipoFormulario: ''
      };
  }

  salvarFormulario() {
    this.formularioService.salvarFormulario(this.formulario).subscribe(() => {
      this.updateEmit.emit();
    });
  }

  getTitulo() {
    if (this.formulario.tipoFormulario == 'FORM')
      return {
        titulo: 'Cadastro de formulários',
        bt: 'Novo formulário'
      };
    if (this.formulario.tipoFormulario == 'BPMN')
      return {
        titulo: 'Cadastro de fluxos',
        bt: 'Novo fluxo'
      };
    if (this.formulario.tipoFormulario == 'DMN')
      return {
        titulo: 'Cadastro de decisões',
        bt: 'Nova decisão'
      };
    return {
      titulo: '',
      bt: ''
    };
  }

  fechar(){
    this.voltarEmit.emit();
  }
}
