import { LayoutService } from '@/base/services/layout.service';
import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-titulo-curto',
  imports: [
    NgIf,
    ButtonModule,
    RouterModule
  ],
  template: `
    <div class="flex justify-between w-full mb-4">
      <div class="flex items-center gap-4 grow">
        <div [class.cursor-pointer]="titulo?.cursorIcone" (click)="iconEmit.emit()" *ngIf=layoutService.isDesktop() class="flex  items-center justify-center bg-gray-100 dark:bg-primary-500/10 rounded-border"
          style="width: 3.5rem; height: 3.5rem">
          <i class="pi {{titulo.icone}} text-gray-500 !text-xl dark:text-primary-300"></i>
        </div>
        <div class="flex flex-col">
        <h5 class="text-black-500 m-0" [class.cursor-pointer]="titulo?.cursorNome">{{titulo.nome}}</h5>
        <span class="text-primary" (click)="subNomeEmit()" [class.cursor-pointer]="titulo?.cursorSubnome">{{titulo.subnome}}</span>
        </div>
      </div>
      @if(titulo.labelButton){
        <p-button (click)="emitir()" outlined [label]="layoutService.isDesktop() ? titulo.labelButton : ''" [className]="'grow lg:flex-none w-full-b'" icon="pi pi-{{titulo.btIcon ?? 'plus-circle'}}" [routerLink]="titulo.url" />
      }
      </div>`,
})
export class TituloCurtoComponent {

  @Input() titulo: any;
  @Output() btEmit = new EventEmitter;
  @Output() btSubNomeEmit = new EventEmitter;
  @Output() iconEmit = new EventEmitter;

   protected isMobile = false;

  constructor(
    public layoutService: LayoutService){}

  emitir() {
    this.btEmit.emit();
  }

  subNomeEmit() {
    this.btSubNomeEmit.emit();
  }
}
