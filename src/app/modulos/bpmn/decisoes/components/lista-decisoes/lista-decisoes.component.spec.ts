import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDecisoesComponent } from './lista-decisoes.component';

describe('ListaDecisoesComponent', () => {
  let component: ListaDecisoesComponent;
  let fixture: ComponentFixture<ListaDecisoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDecisoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDecisoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
