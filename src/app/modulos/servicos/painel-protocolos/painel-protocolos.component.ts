import { Component, OnInit } from '@angular/core';
import { ListaProtocolosComponent } from '../lista-protocolos/lista-protocolos.component';
import { RouterModule } from '@angular/router';
import { HistoryService } from '@/shared/services/history.service';

@Component({
  selector: 'app-painel-protocolos',
  imports: [
    RouterModule
  ],
  templateUrl: './painel-protocolos.component.html',
  styleUrl: './painel-protocolos.component.scss'
})
export class PainelProtocolosComponent implements OnInit {

  protected count: any = {
    total: 0,
    abertos: 0,
    hoje: 0,
    concluidas: 0
  };

  constructor(
    private readonly historyService: HistoryService
  ) { }


  ngOnInit(): void {
    this.historyService.quantidadeInstancias().subscribe(response => this.count.total = response.count);
    this.historyService.quantidadeInstanciasConluidas().subscribe(response => this.count.concluidas = response.count);
    this.historyService.quantidadeInstanciasAbertas().subscribe(response => this.count.abertos = response.count);
    this.historyService.quantidadeInstanciasAbertasHoje().subscribe(response => this.count.hoje = response.count);

  }
}