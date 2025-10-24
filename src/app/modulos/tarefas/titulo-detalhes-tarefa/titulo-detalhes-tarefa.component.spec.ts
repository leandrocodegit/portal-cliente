import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloDetalhesTarefaComponent } from './titulo-detalhes-tarefa.component';

describe('TituloDetalhesTarefaComponent', () => {
  let component: TituloDetalhesTarefaComponent;
  let fixture: ComponentFixture<TituloDetalhesTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloDetalhesTarefaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloDetalhesTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
