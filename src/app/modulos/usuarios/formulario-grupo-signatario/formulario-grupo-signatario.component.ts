import { VoltarSalvarComponent } from '@/shared/components/voltar-salvar/voltar-salvar.component';
import { TipoGrupo } from '@/shared/models/tipo-grupo.enum';
import { FormularioModule } from '@/shared/modules/formulario.module';
import { DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { GrupoService } from '@/shared/services/grupo.service';
import { UsuarioService } from '@/shared/services/usuario.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PickListModule } from 'primeng/picklist';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { LayoutService } from '@/base/services/layout.service';

@Component({
  selector: 'app-formulario-grupo-signatario',
  imports: [
    FormularioModule,
    PickListModule,
    VoltarSalvarComponent,
    DragDropModule,
    MessageModule,
    ButtonModule,
    DialogModule,
    TituloPesquisaComponent,
    TabelaComponent
  ],
  templateUrl: './formulario-grupo-signatario.component.html',
  styleUrl: './formulario-grupo-signatario.component.scss'
})
export class FormularioGrupoSignatarioComponent {

  @Output() voltarEmit = new EventEmitter();
  @Output() updateEmit = new EventEmitter();
  @Input() grupo: any = { attributes: { nome: [''] } };
  protected grupos: any[] = [];
  protected usuarios: Map<string, any> = new Map();
  protected membros: Map<string, any> = new Map();
  protected usuariosGrupo: any[] = [];
  protected dragActive = false;
  protected visible = false;
  protected update = false;

  protected colsUsers: any = [
    { header: 'Nome', field: 'firstName' },
    { header: 'Email', field: 'email' }
  ]

  constructor(
    private readonly grupoService: GrupoService,
    private readonly usuarioService: UsuarioService,
    public readonly layoutService: LayoutService) { }

  ngOnInit(): void {
    if (this.grupo?.id)
      this.buscarGrupo();
    this.listarUsuarios();

    if (!this.grupo?.attributes)
      this.grupo = { attributes: { nome: [''] } };
  }

  protected buscarGrupo() {
    this.grupoService.listaMembrosGrupo(this.grupo.id).subscribe(response => {
      response.forEach(user => {
        const ordens = JSON.parse(this.grupo.attributes.signatarios[0])
        user.ordem = ordens.find(ordem => ordem.id == user.id)?.ordem ?? 0;
        this.usuariosGrupo.push(user)
      })
      this.usuariosGrupo = this.usuariosGrupo.sort((a, b) => a.ordem - b.ordem);
    })
    this.membros = new Map(JSON.parse(this.grupo.attributes.signatarios).map((item) => [item.id, item]));
    this.listarUsuarios();
  }

  protected listarUsuarios() {
    this.usuarioService.listaTodosUsuarios().subscribe(response => {
      this.usuarios = new Map(response.map(item => [item.id, item]));
      this.getMembros().forEach(it => this.usuarios.delete(it.id));
    });
  }

  getUsuarios(): any[] {
    return Array.from(this.usuarios.values());
  }

  getMembros(): any[] {
    return Array.from(this.membros.values());
  }

  protected listarMembros(idGrupo: string) {
    this.usuarioService.listaMembrosGrupo(idGrupo).subscribe(response => {
      //  this.membros = response;
    });
  }

  onDragStart() {
    this.dragActive = true;
  }

  onDragEnd() {
    this.dragActive = false;
  }

  drop(event: any) {
    moveItemInArray(this.usuariosGrupo, event.previousIndex, event.currentIndex);
    this.update = true;

  }

  salvarGrupo() {
    this.grupo.name = this.grupo.attributes.nome[0];
    this.grupo.users = this.getMembros().map((user: any) => user.id);
    this.grupo.attributes.ordem = this.usuariosGrupo.map((user: any) => user.id);
    this.grupo.attributes.signatarios = [JSON.stringify(this.usuariosGrupo.map((user: any, index) => { return { ordem: index, id: user.id } }))];

    if (this.grupo?.id) {
      this.grupoService.atualizarGrupo(this.grupo).subscribe(response => {
          this.updateEmit.emit();
      }, error => {
      });
    } else {
      this.grupoService.criarGrupo(this.grupo, TipoGrupo.SIGNER).subscribe(response => {
        this.grupo = response;
        this.updateEmit.emit();
      }, error => {
        this.grupo.id = undefined;
      });
    }
  }

  removerMembro(user: any) {
    console.log(user);

    this.membros.delete(user.id)
    this.usuarios.set(user.id, user)
    this.update = true;

    this.usuariosGrupo = this.usuariosGrupo.filter(ug => ug.id != user.id);

    console.log(Array.from(this.membros.values()));

  }

  adicionarValue(event: any) {
    this.usuariosGrupo.push(event);
    this.membros.set(event.id, event)
    this.usuarios.delete(event.id);
    this.update = true;
  }

  fechar() {
    this.voltarEmit.emit();
  }

}
