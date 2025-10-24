import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

// Módulos PrimeNG
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { FluidModule } from 'primeng/fluid';
import { HistoryService } from '@/shared/services/history.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TabelaComponent } from '@/shared/components/tabela/tabela.component';
import { TituloPesquisaComponent } from '@/shared/components/titulo-pesquisa/titulo-pesquisa.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ImprimirComponent } from '@/shared/components/imprimir/imprimir.component';
import { FilterSummaryComponent } from '../filter-summary/filter-summary.component';
import { ImprimirRelatorioComponent } from '@/modulos/relatorios/imprimir-relatorio/imprimir-relatorio.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabViewModule,
    InputTextModule,
    CalendarModule,
    InputSwitchModule,
    ToggleSwitchModule,
    ChipModule,
    DropdownModule,
    ButtonModule,
    TooltipModule,
    FluidModule,
    FormsModule,
    TabelaComponent,
    TituloPesquisaComponent,
    ImprimirComponent,
    FilterSummaryComponent,
    ImprimirRelatorioComponent
  ],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent implements OnInit {

  @Output() filtersApplied = new EventEmitter<any>();
  @ViewChild(FilterSummaryComponent) filterSummary!: FilterSummaryComponent;

  protected filterForm: FormGroup;
  protected tab = 0;
  protected tabTipo;
  protected search = new Subject<string>();

  protected cols: any = [
    { header: 'Nome', field: 'name' },
    { header: 'Descrição', field: 'description' },
    { header: 'Status', field: 'taskState', isTypeTask: true },
    { header: 'Abertura', field: 'startTime' },
    { header: 'Conclusão', field: 'endTime' },
    { header: 'Vencimento', field: 'due' }
  ]
  protected pagina = {
    page: 0,
    first: 0,
    rows: 20,
    pageCount: 20
  };

  protected tarefas: any[] = [];

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
    { label: 'Nome da Tarefa', value: 'taskName' },
    { label: 'Data de Início', value: 'startTime' },
    { label: 'Data de Fim', value: 'endTime' },
  ];

  protected sortOrders = [
    { label: 'Ascendente', value: 'asc' },
    { label: 'Descendente', value: 'desc' },
  ];

  constructor(
    private readonly historyService: HistoryService,
    private readonly activeRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router,
    private fb: FormBuilder) {

          this.search.pipe(
            debounceTime(500),
            distinctUntilChanged())
            .subscribe(value => {
              this.onSubmit();
            });
  }

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      // Identificadores
      atenderATodasCondicoes: [false],
      taskId: [''],
      processInstanceId: [''],
      processDefinitionKey: [''],
      taskDefinitionKey: [''],

      // Detalhes da Tarefa
      taskName: [''],
      taskNameLike: [''],
      taskAssignee: [''],
      taskAssigneeLike: [''],
      taskOwner: [''],
      taskOwnerLike: [''],

      // Status (Booleans)
      finished: [null],
      unfinished: [null],
      processFinished: [null],
      processUnfinished: [null],

      // Datas
      taskDueDateAfter: [null],
      taskDueDateBefore: [null],
      startedAfter: [null],
      startedBefore: [null],
      finishedAfter: [null],
      finishedBefore: [null],

      // Arrays
      tenantIdIn: [[]],

      // Filtros Dinâmicos
      taskVariables: this.fb.array([]),
      processVariables: this.fb.array([]),
      sorting: this.fb.array([])
    });

    this.activeRoute.queryParams.subscribe(params => {
      this.tab = params['subTab'] ?? 0;
      this.tabTipo = params['tab'] ?? 'tarefas';
      this.filterForm.get('atenderATodasCondicoes').setValue(params['allCriterios'] == 'true');
    });

    this.filterForm.statusChanges.subscribe(() => this.onSubmit());
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
      titulo: 'Relatório de Tarefas',
      subTitulo: !this.filterSummary?.summaryItems.length ? 'Todas Tarefas' : this.filterSummary?.summaryItems?.map(summary => summary.label).reduce((a, b) => a + ', ' + b)
    }
    return queries;
  }

  selectTab(value: any) {
    this.tab = value;
    this.location.go(this.router.url.split('?')[0], `tab=${this.tabTipo}&subTab=${value}&allCriterios=${this.filterForm.get('atenderATodasCondicoes').value}`);
  }

  setCriterios(value?: boolean) {
    this.filterForm.get('atenderATodasCondicoes').setValue(value);
    this.location.go(this.router.url.split('?')[0], `tab=${this.tabTipo}&subTab=${this.tab}&allCriterios=${value}`);
    this.onSubmit();
  }

  getAtivos() {
    return this.filterForm.get('atenderATodasCondicoes').value;
  }

  visualizar(value: any) {
    this.router.navigate([`/painel/tarefa/detalhes/${value.id}`])
  }
  // Getters para fácil acesso aos FormArrays no template
  get taskVariables(): FormArray {
    return this.filterForm.get('taskVariables') as FormArray;
  }

  get processVariables(): FormArray {
    return this.filterForm.get('processVariables') as FormArray;
  }

  get sorting(): FormArray {
    return this.filterForm.get('sorting') as FormArray;
  }

  // Métodos para adicionar novos controles aos FormArrays
  addTaskVariable(): void {
    this.taskVariables.push(this.fb.group({
      name: [''],
      operator: ['eq'],
      value: ['']
    }));
  }

  addProcessVariable(): void {
    this.processVariables.push(this.fb.group({
      name: [''],
      operator: ['eq'],
      value: ['']
    }));
  }

  addSorting(): void {
    this.sorting.push(this.fb.group({
      sortBy: ['taskName'],
      sortOrder: ['asc']
    }));
  }

  // Métodos para remover controles dos FormArrays
  removeTaskVariable(index: number): void {
    this.taskVariables.removeAt(index);
  }

  removeProcessVariable(index: number): void {
    this.processVariables.removeAt(index);
  }

  removeSorting(index: number): void {
    this.sorting.removeAt(index);
  }

  /**
   * Limpa o formulário, incluindo os FormArrays.
   */
  resetForm(): void {
    this.filterForm.reset({
      tenantIdIn: []
    });
    this.taskVariables.clear();
    this.processVariables.clear();
    this.sorting.clear();
  }

  /**
   * Processa e emite os filtros preenchidos.
   */
  onSubmit(): void {
    const rawValue = this.filterForm.getRawValue();
    console.log('Raw', rawValue);

    const cleanedFilters = this.cleanObject(rawValue);
    this.filtersApplied.emit(cleanedFilters);

    let queries = cleanedFilters;

    if (!this.filterForm.get('atenderATodasCondicoes')?.value)
      queries = { orQueries: [cleanedFilters] };

    queries.sorting = rawValue.sorting;
    this.historyService.filtrarTarefas(queries).subscribe(response => {
      this.tarefas = response;
    });
  }

  private cleanObject(obj: any): any {
    const newObj: any = {};
    Object.keys(obj).forEach(key => {
      let value = obj[key];
      if (value !== null && value !== undefined && value !== false) {
        if (Array.isArray(value) && value.length > 0) {
          newObj[key] = value.map(item => typeof item === 'object' ? this.cleanObject(item) : item);
        } else if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0) {
          const cleanedChild = this.cleanObject(value);
          if (Object.keys(cleanedChild).length > 0) {
            newObj[key] = cleanedChild;
          }
        } else if (typeof value !== 'object' && value !== '') {
          newObj[key] = value;
        }
      }
    });
    return newObj;
  }
}

