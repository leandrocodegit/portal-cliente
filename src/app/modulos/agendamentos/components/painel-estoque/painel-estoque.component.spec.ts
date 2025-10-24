import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelEstoqueComponent } from './painel-estoque.component';

describe('PainelEstoqueComponent', () => {
  let component: PainelEstoqueComponent;
  let fixture: ComponentFixture<PainelEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
