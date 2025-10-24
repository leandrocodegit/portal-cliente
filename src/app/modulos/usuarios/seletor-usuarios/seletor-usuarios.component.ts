import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '@/shared/services/usuario.service';
import { GrupoService } from '@/shared/services/grupo.service';
import { TipoGrupo } from '@/shared/models/tipo-grupo.enum';
import { TipoEventoEditor } from '@/modulos/bpmn/fluxos/criar-fluxo-bpmn/tipo-evento.enum';

@Component({
  selector: 'app-seletor-grupo-usuarios',
  imports: [
    TituloPesquisaComponent,
    TabelaComponent,
    ButtonModule
  ],
  templateUrl: './seletor-usuarios.component.html',
  styleUrl: './seletor-usuarios.component.scss'
})
export class SeletorUsuariosComponent implements OnInit {

  @Output() voltarEmit = new EventEmitter();
  @Output() addEmit = new EventEmitter();
  @Input() canditatosSelecionados: Map<string, string> = new Map();
  @Input() tipoEventoEditor: TipoEventoEditor;
  @Input() assignee: any;
  protected usuarios: any[] = [];
  protected grupos: any[] = [];
  protected cols: any = [
    { header: 'Nome', field: 'firstName' },
    { header: 'Email', field: 'email' }
  ];
  protected colsGrupos: any = [
    { header: 'Nome', field: 'description' }
  ];

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly grupoService: GrupoService) { }

  ngOnInit(): void {
    if (this.tipoEventoEditor.includes('GROUP'))
      this.listarDepartamentos();
    else this.listarUsuarios();
  }

  listarDepartamentos() {
    this.grupoService.listaGrupos(TipoGrupo.DEPARTMENT).subscribe(response => {
      response.forEach(grupo => {
        grupo.select = this.canditatosSelecionados.has(grupo.name);
      })
      this.grupos = response;
    })
  }

  protected listarUsuarios() {
    this.usuarioService.listaTodosUsuarios().subscribe(response => {
      if(this.tipoEventoEditor === TipoEventoEditor.LIST_ASSIGNEE_TASK){
        let assign: any = response.find(user => user.id == this.assignee);
        if(assign)
          assign['select'] = true;
      }else {
         response.forEach(user => {
        user.select = this.canditatosSelecionados.has(user.id);
      })
      }

      this.usuarios = response;
    });
  }

  adicionarValue(event: any) {
    if(this.tipoEventoEditor ===TipoEventoEditor.LIST_ASSIGNEE_TASK)
      this.usuarios.forEach(user => user.select = false)
    event.select = !event.select;
    this.addEmit.emit(event);
  }

  fechar() {
    this.voltarEmit.emit();
  }
}
