import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelProtocolosComponent } from './painel-protocolos.component';

describe('PainelProtocolosComponent', () => {
  let component: PainelProtocolosComponent;
  let fixture: ComponentFixture<PainelProtocolosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelProtocolosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelProtocolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
