import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CadastroFormComponent } from '../cadastro-form/cadastro-form.component';
import { StepperModule } from 'primeng/stepper';
import { FeaturesWidget } from '../components/featureswidget';
import { ModulosComponent } from '../components/modulos/modulos.component';
import { CadastroCompletoComponent } from '../components/cadastro-completo/cadastro-completo.component';
import { CadastroEnderecoComponent } from '../cadastro-endereco/cadastro-endereco.component';
import { CommonModule } from '@angular/common';
import { ClienteRequest } from '../../usuarios/models/cliente-request.model';
import { CadastroClienteService } from '../services/cadastro.service';


@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    RouterModule,
    StepperModule,
    RippleModule,
    StyleClassModule,
    ButtonModule,
    DividerModule,
    CadastroFormComponent,
    ModulosComponent,
    CadastroCompletoComponent,
    CadastroEnderecoComponent
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  protected cliente: ClienteRequest = new ClienteRequest();
  protected pessoaJuridica: any = { value: false };

  constructor(private readonly cadastroClienteService: CadastroClienteService) {

  }

  salvar() {
    this.cadastroClienteService.criarCliente(this.cliente).subscribe(response => {
      console.log(response);

    })
  }

}
