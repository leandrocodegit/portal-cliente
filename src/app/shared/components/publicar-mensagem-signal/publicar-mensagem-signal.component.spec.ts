import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarMensagemSignalComponent } from './publicar-mensagem-signal.component';

describe('PublicarMensagemSignalComponent', () => {
  let component: PublicarMensagemSignalComponent;
  let fixture: ComponentFixture<PublicarMensagemSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarMensagemSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicarMensagemSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
