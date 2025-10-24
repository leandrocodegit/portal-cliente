import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesTarefaComponent } from './detalhes-tarefa.component';

describe('DetalhesTarefaComponent', () => {
  let component: DetalhesTarefaComponent;
  let fixture: ComponentFixture<DetalhesTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesTarefaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
