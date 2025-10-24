import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProgressBar } from 'primeng/progressbar';


@Component({
  selector: 'app-processando-load',
  imports: [
    ProgressBar,
    ButtonModule
  ],
  templateUrl: './processando-load.component.html',
  styleUrl: './processando-load.component.scss'
})
export class ProcessandoLoadComponent implements OnInit, OnDestroy {

  private intervalo: any;
  protected viewFechar = false;

  constructor(private ref: DynamicDialogRef) {}

  ngOnInit(): void {
      this.intervalo = setInterval(() => {
        this.viewFechar = true;
        clearInterval(this.intervalo);
      }, 3000);
  }


  fechar(){
    this.ref.close();
  }

  ngOnDestroy(): void {
    if(this.intervalo)
    clearInterval(this.intervalo);

  }


}
