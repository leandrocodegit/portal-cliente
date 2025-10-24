import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirRelatorioComponent } from './imprimir-relatorio.component';

describe('ImprimirRelatorioComponent', () => {
  let component: ImprimirRelatorioComponent;
  let fixture: ComponentFixture<ImprimirRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImprimirRelatorioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
