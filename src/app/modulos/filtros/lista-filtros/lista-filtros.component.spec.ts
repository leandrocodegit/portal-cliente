import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFiltrosComponent } from './lista-filtros.component';

describe('ListaFiltrosComponent', () => {
  let component: ListaFiltrosComponent;
  let fixture: ComponentFixture<ListaFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFiltrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
