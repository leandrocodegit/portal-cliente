import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelDecisaoComponent } from './painel-decisao.component';

describe('PainelDecisaoComponent', () => {
  let component: PainelDecisaoComponent;
  let fixture: ComponentFixture<PainelDecisaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelDecisaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelDecisaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
