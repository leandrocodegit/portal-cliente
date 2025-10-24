import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoltarSalvarComponent } from './voltar-salvar.component';

describe('VoltarSalvarComponent', () => {
  let component: VoltarSalvarComponent;
  let fixture: ComponentFixture<VoltarSalvarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoltarSalvarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoltarSalvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
