import { Component, OnInit } from '@angular/core';
import { FormularioModule } from 'src/app/shared/modules/formulario.module';
import { TituloCurtoComponent } from 'src/app/shared/components/titulo-curto/titulo-curto.component';
import { VoltarSalvarComponent } from 'src/app/shared/components/voltar-salvar/voltar-salvar.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GrupoService } from 'src/app/shared/services/grupo.service';
import { TipoGrupo } from '@/shared/models/tipo-grupo.enum';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-formulario-grupo',
  imports: [
    FormularioModule,
    TituloCurtoComponent,
    VoltarSalvarComponent
  ],
  templateUrl: './formulario-grupo.component.html',
  styleUrl: './formulario-grupo.component.scss'
})
export class FormularioGrupoComponent implements OnInit {

  protected grupo?: any = {
    name: '',
    type: 'DEPARTMENT'
  };

  constructor(
    private readonly grupoService: GrupoService,
    private readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
  ) {
    this.grupo = config.data;
  }

  ngOnInit(): void {
  }

  salvarGrupo() {
    if (this.grupo?.attributes?.nome)
      this.grupo.name = this.grupo.attributes.nome[0];
    else this.grupo.name = this.grupo.description;
    if (this.grupo?.id) {
      this.grupo['attributes']['nome'] = [this.grupo.description];
      console.log(this.grupo);

      this.grupoService.atualizarGrupo(this.grupo).subscribe(response => {
        this.grupo = response;
        this.fechar(); 
      }, error => {
      });
    } else {
      this.grupoService.criarGrupo(this.grupo, TipoGrupo.DEPARTMENT).subscribe(() => {
         this.fechar();
      }, error => {
        this.grupo.id = undefined;
      });
    }
  }

  fechar() {
    this.ref.close();
  }
}
