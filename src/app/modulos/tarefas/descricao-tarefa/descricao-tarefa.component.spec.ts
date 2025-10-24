import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoTarefaComponent } from './descricao-tarefa.component';

describe('DescricaoTarefaComponent', () => {
  let component: DescricaoTarefaComponent;
  let fixture: ComponentFixture<DescricaoTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescricaoTarefaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescricaoTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
