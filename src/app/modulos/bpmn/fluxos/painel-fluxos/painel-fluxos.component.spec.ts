import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelFluxosComponent } from './painel-fluxos.component';

describe('PainelFluxosComponent', () => {
  let component: PainelFluxosComponent;
  let fixture: ComponentFixture<PainelFluxosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelFluxosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelFluxosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
