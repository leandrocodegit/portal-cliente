import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPermissoesComponent } from './lista-permissoes.component';

describe('ListaPermissoesComponent', () => {
  let component: ListaPermissoesComponent;
  let fixture: ComponentFixture<ListaPermissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPermissoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPermissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
