import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaModelosAssinaturaComponent } from './lista-modelos-assinatura.component';

describe('ListaModelosAssinaturaComponent', () => {
  let component: ListaModelosAssinaturaComponent;
  let fixture: ComponentFixture<ListaModelosAssinaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaModelosAssinaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaModelosAssinaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
