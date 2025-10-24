import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { OcupacaoAgendaComponent } from '../ocupacao-agenda/ocupacao-agenda.component';
import { FluidModule } from 'primeng/fluid';
import { FieldsetModule } from 'primeng/fieldset';
import { AvancarComponent } from '../../../../shared/components/avancar/avancar.component';
import { DatePickerModule } from 'primeng/datepicker';


@Component({
  selector: 'app-calendario-grid',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgFor,
    TagModule,
    NgClass,
    OverlayBadgeModule,
    ChartModule,
    ButtonModule,
    RouterModule,
    FluidModule,
    FieldsetModule,
    DatePickerModule,
    OcupacaoAgendaComponent,
    AvancarComponent
  ],
  templateUrl: './calendario-grid.component.html',
  styleUrl: './calendario-grid.component.scss'
})
export class CalendarioGridComponent {
  selectedMonth: string = this.formatarData(new Date());
  daysInMonth: { day: number, date: Date }[] = [];
  protected agenda: any[] = [1, 14, 15, 18, 19, 29,5,12,26];
  barData: any;
  barOptions: any;
  date = new Date

  ngOnInit() {
    this.generateDays();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
      datasets: [
          {
              label: 'Vagas disponiveis',
              backgroundColor: '#01b998',
              borderColor: documentStyle.getPropertyValue('--p-primary-500'),
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Vagas ocupadas',
              backgroundColor: '#ffe19c',
              borderColor: documentStyle.getPropertyValue('--p-primary-200'),
              data: [28, 48, 40, 19, 16, 27, 40]
          }
      ]
  };
    this.barOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

  }

  onMonthChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedMonth = input.value;
    this.generateDays();
  }

  disponivel(date: Date) {
    return this.agenda.find(day => date.getDate() == day)

  }

  generateDays() {
    this.daysInMonth = [];

    const [year, month] = this.selectedMonth.split('-').map(Number);
    const days = new Date(year, month, 0).getDate(); // último dia do mês

    for (let i = 1; i <= days; i++) {
      this.daysInMonth.push({
        day: i,
        date: new Date(year, month - 1, i)
      });
    }
  }

  isWeekend(date: Date): boolean {
    const day = new Date(date).getDay();
    return day === 0 || day === 6;
  }

  proximoMes() {
    const [ano, mes] = this.selectedMonth.split('-').map(Number);
    const novaData = new Date(ano, mes, 1); // próximo mês
    this.selectedMonth = this.formatarData(novaData);
    this.generateDays();
  }

  mesAnterior() {
    console.log('Anterior');

    const [ano, mes] = this.selectedMonth.split('-').map(Number);
    const novaData = new Date(ano, mes - 2, 1); // mês anterior
    this.selectedMonth = this.formatarData(novaData);
    this.generateDays();
  }

  private formatarData(data: Date): string {
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    return `${ano}-${mes}`;
  }

  atual(){
    this.selectedMonth = this.formatarData(new Date());
    this.generateDays();
  }

}
