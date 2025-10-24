import { Component, OnInit } from '@angular/core';
import { FormularioModule } from 'src/app/shared/modules/formulario.module';
import { TituloCurtoComponent } from 'src/app/shared/components/titulo-curto/titulo-curto.component';
import { VoltarSalvarComponent } from 'src/app/shared/components/voltar-salvar/voltar-salvar.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FiltroService } from 'src/app/shared/services/filtro.service';
import { ColorPickerModule } from 'primeng/colorpicker';
import { TabelaComponent } from 'src/app/shared/components/tabela/tabela.component';
import { FILTER_SORT, QUERYES_FILTRO } from '../models/querys';
import { DialogModule } from 'primeng/dialog';
import { TituloPesquisaComponent } from 'src/app/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { SelectModule } from 'primeng/select';
import { Filtro } from '../models/filtro.model';
import { UsuarioService } from '@/shared/services/usuario.service';
import { GrupoService } from '@/shared/services/grupo.service';
import { CheckboxModule } from 'primeng/checkbox';
import { PickListModule } from 'primeng/picklist';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TipoGrupo } from '@/shared/models/tipo-grupo.enum';

@Component({
  selector: 'app-formulario-filtros',
  imports: [
    FormularioModule,
    TituloCurtoComponent,
    TituloPesquisaComponent,
    VoltarSalvarComponent,
    ColorPickerModule,
    TabelaComponent,
    DialogModule,
    SelectModule,
    CheckboxModule,
    PickListModule,
    CheckboxModule,
    RadioButtonModule,
  ],
  templateUrl: './formulario-filtros.component.html',
  styleUrl: './formulario-filtros.component.scss'
})
export class FormularioFiltrosComponent implements OnInit {

  protected filtro?: Filtro;
  protected visible = false;
  protected includeAssignedTasks = false;
  protected parametroSelect: {
    value: any,
    form: {
      query: string,
      editavel: boolean,
      type: string,
      nome: string,
      prefix: string,
      suffix: string,
      opcoes: []
    }
  } = {
      value: undefined,
      form: {
        query: '',
        editavel: true,
        type: '',
        nome: '',
        prefix: '',
        suffix: '',
        opcoes: []
      }
    }

  protected autorization = {
    users: [],
    groups: [],
    sortings: []
  }
  protected queryes = QUERYES_FILTRO;
  protected sortings = FILTER_SORT;
  protected colsSelect: any = [];
  protected parametros: Map<any, any> = new Map<any, any>();

  protected cols: any = [
    { header: 'Nome', field: 'nome' },
    { header: 'Query', field: 'query' },
    { header: 'Valor', field: 'value', isInput: true }
  ]

  protected colsUsers: any = [
    { header: 'Nome', field: 'firstName' },
    { header: 'Email', field: 'email' }
  ]

  protected colsGrupo = [
    { header: 'Nome', field: 'name' },
    { header: 'Descrição', field: 'description' }
  ]

  protected itens: any[] = [];
  protected itensSelect: any[] = [];
  protected usuarios: any[] = [];
  protected grupos: any[] = [];
  protected usuariosCopia: any[] = [];
  protected gruposCopia: any[] = [];
  protected departamentos: any[] = [];


  constructor(
    private readonly filterService: FiltroService,
    private readonly usuarioService: UsuarioService,
    private readonly grupoService: GrupoService,
    private readonly location: Location,
    private readonly activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      if (param['id']) {
        this.filterService.buscarFiltro(param['id']).subscribe(response => {
          this.filtro = response;
          this.initFiltro();
          this.carregarUsuarioAutorizados();
        });
      } else {
        this.filtro = {
          id: undefined,
          resourceType: 'Task',
          name: '',
          owner: null,
          query: {
            caseInstanceVariables: [],
            orQueries: [],
            processVariables: [],
            taskVariables: []
          },
          properties: {
            color: '#000000',
            description: '',
            showUndefinedVariable: false,
            refresh: false,
            priority: 0,
            sorting: [],
            view: 'ALL_USERS',
            allCriterios: 'E',
            dashboard: true,
            naoSupervisionadas: false
          }
        }
      }

      this.listaUsuarios();
      this.listaGrupos();
    });
  }

  private initFiltro(ignorarSet?: boolean) {
    this.itens = [];
    if (this.filtro?.properties?.allCriterios == 'OR' && this.filtro?.query?.orQueries?.length) {
      this.filtro.query = this.filtro?.query?.orQueries[0];
    }

     this.includeAssignedTasks = this.filtro.query['includeAssignedTasks'];

    for (const key in this.filtro.query) {
      const value = this.filtro.query[key];
      if (value !== null && value !== undefined) {

        const query = this.queryes.get(key)

        if (query) {
          var valor = value;
          if (value && value.length && this.isArray(value)) {
            valor = value.reduce((a, b) => a + ',' + b);
          }

          if (!ignorarSet && query) {
            this.parametros.set(key, {
              nome: query.form.nome,
              query: key,
              value: value,
              editavel: query.form.editavel
            });
          }
        }

        this.itens = Array.from(this.parametros.values());
        this.autorization.sortings = FILTER_SORT.filter(sort => this.filtro?.properties?.sorting?.find(autSort => autSort.sortBy == sort.sorting.sortBy));
        this.sortings = FILTER_SORT.filter(sort => !this.autorization.sortings.find(autSort => autSort.sorting.sortBy == sort.sorting.sortBy));
      }
    }
  }

  getItens(type: any) {
    return [];
  }

  isArray(value: any) {
    return value instanceof Array;
  }

  contemCandidateUser() {
    return this.parametros.has('candidateUserExpression');
  }

  salvarFiltro() {

    this.filtro.query = new Map<any, any>;
    Array.from(this.parametros.keys()).forEach(key => {
      this.filtro.query[key] = this.parametros.get(key).value;
    })

    if(this.includeAssignedTasks)
      this.filtro.query['includeAssignedTasks'] = this.includeAssignedTasks

    if (this.filtro?.properties?.allCriterios == 'OR') {
      var criterios = [this.filtro.query];
      this.filtro.query = new Map<any, any>;
      this.filtro.query.orQueries = criterios;
    }

    var auth = {
      users: this.filtro.properties.view == 'ALL_USERS' ? [] : this.autorization.users.map(user => user.id),
      groups: this.filtro.properties.view == 'ALL_USERS' ? [] : this.autorization.groups.map(group => group.name),
      allUsers: this.filtro.properties.view == 'ALL_USERS'
    }

    this.filtro.properties.sorting = this.autorization.sortings.map(sort => sort.sorting);
    this.filterService.salvarFiltro({
      filter: this.filtro,
      authorization: auth
    }).subscribe(response => {
      this.filtro = response
      this.location.go(`painel/filtro/edit/${this.filtro.id}`)
    });
  }

  alterarValorOpcoes(value: any) {
    console.log('Value', value);

    if (!value || value == '')
      this.parametroSelect.value = null;


    if (!value)
      this.parametroSelect.form.editavel = true;
    else
      this.parametroSelect.form.editavel = false;
  }

  getParametros() {
    return Array.from(this.queryes.values());
  }

  listaUsuarios() {
    this.usuarioService.listaUsuarios({}).subscribe(response => {
      this.usuarios = response;
      this.usuariosCopia = response;
    })
  }

  carregarUsuarioAutorizados() {
    this.filterService.listaAutorizacoesFiltro(this.filtro.id).subscribe(response => {
      const users = response.filter(auth => auth.userId);
      const gps = response.filter(auth => auth.groupId);
      this.autorization.users = this.usuarios.filter(user => !!users.find(auth => auth.userId == user.id));
      this.autorization.groups = this.grupos.filter(group => !!gps.find(auth => auth?.groupId == group.name));
      this.usuarios = this.usuarios.filter(user => !users.find(auth => auth.userId == user.id));
      this.grupos = this.grupos.filter(group => !gps.find(auth => auth?.groupId == group.name));
    })
  }

  listaGrupos() {
    this.grupoService.listaGrupos(TipoGrupo.DEPARTMENT).subscribe(response => {
      this.grupos = response;
      this.gruposCopia = response;
    })
  }

  editar(event: any) {

    if (event.query == 'assigneeIn') {
      this.itensSelect = this.usuariosCopia;
      this.colsSelect = this.colsUsers;
    } else if (event.query == 'candidateGroups') {
      this.colsSelect = this.colsGrupo;
      this.itensSelect = this.gruposCopia;
    }
    this.parametroSelect = this.getParametros().find(param => param.form.query == event.query);
    this.visible = true;
  }

  getItensParametros() {
    return Array.from(this.parametros.values());
  }

  adicionarValue(event: any) {

    event.select = !event.select;
    var idSelect = event.id;

    if (this.parametroSelect.form.query == 'candidateGroups')
      idSelect = event.name;

    if (event.select)
      this.parametroSelect.value.push(idSelect);
    else
      this.parametroSelect.value = this.parametroSelect.value.filter(val => val != idSelect);
  }

  removerQuery(event: any) {
    this.parametros.delete(event.query);
  }

  salvarParametro() {
    var value: string = this.parametroSelect.value;
    if (this.parametroSelect.form?.prefix && !value.startsWith(this.parametroSelect.form?.prefix))
      value = this.parametroSelect.form?.prefix + value;
    if (this.parametroSelect.form?.suffix && !value.endsWith(this.parametroSelect.form?.suffix))
      value += this.parametroSelect.form?.suffix;
    this.filtro.query[this.parametroSelect.form.query] = value;
    this.parametros.set(this.parametroSelect.form.query, this.parametroSelect)
    this.initFiltro();

  }
}
