import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoesAgendaComponent } from './configuracaoes-agenda.component';

describe('ConfiguracaoesAgendaComponent', () => {
  let component: ConfiguracaoesAgendaComponent;
  let fixture: ComponentFixture<ConfiguracaoesAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracaoesAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoesAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
