import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelPermissoesComponent } from './painel-permissoes.component';

describe('PainelPermissoesComponent', () => {
  let component: PainelPermissoesComponent;
  let fixture: ComponentFixture<PainelPermissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelPermissoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelPermissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
