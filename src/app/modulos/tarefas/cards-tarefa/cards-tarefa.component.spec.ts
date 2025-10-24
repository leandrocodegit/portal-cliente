import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsTarefaComponent } from './cards-tarefa.component';

describe('CardsTarefaComponent', () => {
  let component: CardsTarefaComponent;
  let fixture: ComponentFixture<CardsTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsTarefaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
