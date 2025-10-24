import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { SelecionaDiasSemadaComponent } from 'src/app/shared/components/seleciona-dias-semada/seleciona-dias-semada.component';
import { VoltarSalvarComponent } from 'src/app/shared/components/voltar-salvar/voltar-salvar.component';

@Component({
  selector: 'app-permissoes-usuario',
  imports: [
    InputTextModule,
    SelecionaDiasSemadaComponent,
    StyleClassModule,
    ButtonModule,
    RouterModule,
    VoltarSalvarComponent
  ],
  templateUrl: './permissoes-usuario.component.html',
  styleUrl: './permissoes-usuario.component.scss'
})
export class PermissoesUsuarioComponent {

  @Input() disable = false;

  constructor(private location: Location) {}

  salvar(){
    this.location.back();
  }
}
