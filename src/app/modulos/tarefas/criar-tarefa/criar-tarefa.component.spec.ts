import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTarefaComponent } from './criar-tarefa.component';

describe('CriarTarefaComponent', () => {
  let component: CriarTarefaComponent;
  let fixture: ComponentFixture<CriarTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarTarefaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
