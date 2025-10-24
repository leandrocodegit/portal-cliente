import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemSucessoComponent } from './mensagem-sucesso.component';

describe('MensagemSucessoComponent', () => {
  let component: MensagemSucessoComponent;
  let fixture: ComponentFixture<MensagemSucessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensagemSucessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensagemSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
