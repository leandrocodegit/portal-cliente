import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicionarAssinaturaComponent } from './posicionar-assinatura.component';

describe('PosicionarAssinaturaComponent', () => {
  let component: PosicionarAssinaturaComponent;
  let fixture: ComponentFixture<PosicionarAssinaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosicionarAssinaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosicionarAssinaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
