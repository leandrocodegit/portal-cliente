import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Módulos PrimeNG
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

// Componentes e Serviços (Assumindo que existem)
import { HistoryService } from '@/shared/services/history.service';
import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ChipModule } from 'primeng/chip';
import { RelatorioService } from '@/shared/services/relatorio.service';
import { ImprimirComponent } from '@/shared/components/imprimir/imprimir.component';
import { FilterSummaryComponent } from '../filter-summary/filter-summary.component';
import { ImprimirRelatorioComponent } from '@/modulos/relatorios/imprimir-relatorio/imprimir-relatorio.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';


@Component({
  selector: 'app-process-instance-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabViewModule,
    InputTextModule,
    CalendarModule,
    ToggleSwitchModule,
    ChipModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    ToggleSwitchModule,
    TabelaComponent,
    TituloPesquisaComponent,
    ImprimirComponent,
    FilterSummaryComponent,
    ImprimirRelatorioComponent
  ],
  templateUrl: './process-instance-filter.component.html',
  styleUrls: ['./process-instance-filter.component.scss']
})
export class ProcessInstanceFilterComponent implements OnInit {

  @Output() filtersApplied = new EventEmitter<any>();
  @ViewChild(FilterSummaryComponent) filterSummary!: FilterSummaryComponent;

  protected filterForm: FormGroup;
  protected tab = 0;
  protected tabTipo;
  protected search = new Subject<string>();

  protected cols: any = [
    { header: 'ID da Instância', field: 'id' },
    { header: 'Chave de Negócio', field: 'businessKey', isCopy: true },
    { header: 'Chave da Definição', field: 'definitionKey' },
    { header: 'Início', field: 'startTime' },
    { header: 'Fim', field: 'endTime' },
    { header: 'Status', field: 'state', isTypeTask: true }
  ];
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };
  protected instancias: any[] = [];

  // Opções para os dropdowns
  protected variableOperators = [
    { label: 'Igual (=)', value: 'eq' },
    { label: 'Diferente (!=)', value: 'neq' },
    { label: 'Maior que (>)', value: 'gt' },
    { label: 'Maior ou Igual (>=)', value: 'gteq' },
    { label: 'Menor que (<)', value: 'lt' },
    { label: 'Menor ou Igual (<=)', value: 'lteq' },
    { label: 'Contém (like)', value: 'like' },
  ];

  protected sortableFields = [
    { label: 'ID da Instância', value: 'instanceId' },
    { label: 'Chave da Definição', value: 'definitionKey' },
    { label: 'ID da Definição', value: 'definitionId' },
  ];

  protected sortOrders = [
    { label: 'Ascendente', value: 'asc' },
    { label: 'Descendente', value: 'desc' },
  ];

  constructor(
    private readonly historyService: HistoryService,
    private readonly activeRoute: ActivatedRoute,
    private readonly relatorioService: RelatorioService,
    private readonly location: Location,
    private readonly router: Router,
    private fb: FormBuilder
  ) {
    this.search.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.onSubmit();
      });
  }

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      // Controle do cabeçalho
      atenderATodasCondicoes: [false],

      // Definição e Chaves
      processDefinitionKey: [''],
      processDefinitionKeyIn: [[]],
      processDefinitionName: [''],
      processDefinitionNameLike: [''],
      processInstanceBusinessKey: [''],
      processInstanceBusinessKeyLike: [''],

      // Status
      finished: [null],
      unfinished: [null],
      withIncidents: [null],
      active: [null],
      suspended: [null],

      // Datas
      startedAfter: [null],
      startedBefore: [null],
      finishedAfter: [null],
      finishedBefore: [null],

      // Outros
      startedBy: [''],

      // Filtros Dinâmicos
      variables: this.fb.array([]),
      orQueries: this.fb.array([]),
      sorting: this.fb.array([])
    });

    this.activeRoute.queryParams.subscribe(params => {
      this.tab = parseInt(params['subTab'] || '0', 10);
      this.tabTipo = params['tab'] ?? 'instancias';
      this.filterForm.get('atenderATodasCondicoes').setValue(params['allCriterios'] == 'true');
    });




    this.filterForm.statusChanges.subscribe(() => this.search.next(crypto.randomUUID()));
  }


  selectTab(value: any): void {
    this.tab = value;
    this.location.go(this.router.url.split('?')[0], `tab=${this.tabTipo}&subTab=${value}&allCriterios=${this.filterForm.get('atenderATodasCondicoes').value}`);
  }

  setCriterios(value: boolean) {
    this.filterForm.get('atenderATodasCondicoes').setValue(value);
    this.location.go(this.router.url.split('?')[0], `tab=${this.tabTipo}&subTab=${this.tab}&allCriterios=${value}`);
    // this.onSubmit();
  }

  getAtivos() {
    return this.filterForm.get('atenderATodasCondicoes').value;
  }

  visualizar(value: any): void {
    this.router.navigate([`/painel/instance/detalhes/${value.id}`]);
  }

  // Getters para FormArrays
  get variables(): FormArray {
    return this.filterForm.get('variables') as FormArray;
  }

  get orQueries(): FormArray {
    return this.filterForm.get('orQueries') as FormArray;
  }

  get sorting(): FormArray {
    return this.filterForm.get('sorting') as FormArray;
  }

  // Métodos para adicionar novos controles
  addVariable(): void {
    this.variables.push(this.fb.group({
      name: [''],
      operator: ['eq'],
      value: ['']
    }));
  }

  addOrQuery(): void {
    this.orQueries.push(this.fb.group({
      processDefinitionKey: [''],
      startedBy: [''],
      finished: [null]
    }));
  }

  addSorting(): void {
    this.sorting.push(this.fb.group({
      sortBy: ['instanceId'],
      sortOrder: ['asc']
    }));
  }

  // Métodos para remover controles
  removeVariable(index: number): void {
    this.variables.removeAt(index);
  }

  removeOrQuery(index: number): void {
    this.orQueries.removeAt(index);
  }

  removeSorting(index: number): void {
    this.sorting.removeAt(index);
  }

  resetForm(): void {
    this.filterForm.reset({
      atenderATodasCondicoes: true,
      processDefinitionKeyIn: []
    });
    this.variables.clear();
    this.orQueries.clear();
    this.sorting.clear();
    this.instancias = [];
  }

  onSubmit(): void {
    const rawValue = this.filterForm.getRawValue();
    const cleanedFilters = this.cleanObject(rawValue);

    let queries = cleanedFilters;
    if (!this.filterForm.get('atenderATodasCondicoes')?.value) {
      // Remove o controle do switch da query para não ser enviado para a API
      delete queries.atenderATodasCondicoes;
      queries = { orQueries: [queries] };
    }

    queries.sorting = rawValue.sorting;
    this.historyService.filtrarInstancias(queries).subscribe(response => {
      this.instancias = response;
    });
  }

  getQuery() {
    const rawValue = this.filterForm.getRawValue();
    const cleanedFilters = this.cleanObject(rawValue);

    let queries = cleanedFilters;

    if (!this.filterForm.get('atenderATodasCondicoes')?.value) {
      delete queries.atenderATodasCondicoes;
      queries = { orQueries: [queries] };
    }
    queries.info = {
      titulo: 'Relatório de Instâncias de Processos',
      subTitulo: !this.filterSummary?.summaryItems.length ? 'Todas Instâncias' : this.filterSummary?.summaryItems?.map(summary => summary.label).reduce((a, b) => a + ', ' + b)
    }
    return queries;
  }

  private cleanObject(obj: any): any {
    const newObj: any = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (value !== null && value !== undefined) {
        if (Array.isArray(value) && value.length > 0) {
          const cleanedArray = value.map(item => typeof item === 'object' ? this.cleanObject(item) : item)
            .filter(item => typeof item !== 'object' || Object.keys(item).length > 0);
          if (cleanedArray.length > 0) {
            newObj[key] = cleanedArray;
          }
        } else if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0) {
          const cleanedChild = this.cleanObject(value);
          if (Object.keys(cleanedChild).length > 0) {
            newObj[key] = cleanedChild;
          }
        } else if (typeof value !== 'object' && value !== '' && typeof value !== 'boolean' || (typeof value === 'boolean' && value === true)) {
          newObj[key] = value;
        }
      }
    });
    return newObj;
  }
}


