import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { Horario } from '../../models/agenda.model';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProcessandoLoadComponent } from '../../../../shared/components/processando-load/processando-load.component';
import { FilterMatchMode, FilterService, SelectItem } from 'primeng/api';
import { Popover } from 'primeng/popover';
import { DatePickerModule } from 'primeng/datepicker';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Tag } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-lista-horarios-agenda',
  standalone: true,
  imports: [
    TableModule,
    MultiSelectModule,
    SelectModule,
    InputIconModule,
     InputTextModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    ToastModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RatingModule,
    RippleModule,
    IconFieldModule,
    DatePipe,
    Popover,
    DatePickerModule,
    SliderModule,
    DynamicDialogModule,
    OverlayBadgeModule,
    TagModule
  ],
  templateUrl: './lista-horarios-agenda.component.html',
  styleUrl: './lista-horarios-agenda.component.scss',
  providers: [ConfirmationService, MessageService, DialogService]
})
export class ListaHorariosAgendaComponent implements OnInit {
  horarios: Horario[] = [];


  selectedCustomer: Horario = {} as Horario;

  representatives: any[] = [];

  statuses: any[] = [];


  rowGroupMetadata: any;


  activityValues: number[] = [0, 100];

  isExpanded: boolean = false;

  balanceFrozen: boolean = false;

  loading: boolean = true;
  dataFiltro?: Date;

  @ViewChild('filter') filter!: ElementRef;
  private ref: DynamicDialogRef | undefined;
  protected matchModeOptions?: SelectItem[];
  protected matchModeOptionsDate?: SelectItem[];
  col?: any =  { field: 'data', header: 'Dia' };

  constructor(
    public readonly dialogService: DialogService,

  ) {


  }

  filtrar(evt:any) {


 }

  ngOnInit() {


    this.matchModeOptions = [
      { label: 'Inicia', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contem', value: FilterMatchMode.CONTAINS }
  ];

  this.matchModeOptionsDate = [
    { label: 'Data inicial', value: FilterMatchMode.DATE_BEFORE },
    { label: 'Data final', value: FilterMatchMode.DATE_AFTER }
];

    this.horarios = [
      {
        id: '',
        horario: new Date(),
        profissional: 'Leandro',
        situacao: 'Livre',
        ativo: true,
        vagas: {livre: 100, ocupadas: 2}
      },
      {
        id: '',
        horario: new Date(),
        profissional: 'Pereira',
        situacao: 'Livre',
        ativo: false,
        vagas: {livre: 150, ocupadas: 140}
      }
    ]

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];

    var intervalo = setInterval(() => {
      this.loading = false;
      clearInterval(intervalo);
    }, 1000);
  }

  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};


  }

  expandAll() {

  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getSeverity(status: string) {
    switch (status) {
      case 'qualified':
      case 'instock':
      case 'INSTOCK':
      case 'DELIVERED':
      case 'delivered':
        return 'success';

      case 'negotiation':
      case 'lowstock':
      case 'LOWSTOCK':
      case 'PENDING':
      case 'pending':
        return 'warn';

      case 'unqualified':
      case 'outofstock':
      case 'OUTOFSTOCK':
      case 'CANCELLED':
      case 'cancelled':
        return 'danger';

      default:
        return 'info';
    }
  }

  gerarHorarios(){
    this.ref = this.dialogService.open(ProcessandoLoadComponent, { header: 'Aguarde, gerando horários...'});
  }

  calculateCustomerTotal(name: string) {
    let total = 0;



    return total;
  }
}
