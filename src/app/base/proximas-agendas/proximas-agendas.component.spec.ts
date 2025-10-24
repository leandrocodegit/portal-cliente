import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximasAgendasComponent } from './proximas-agendas.component';

describe('ProximasAgendasComponent', () => {
  let component: ProximasAgendasComponent;
  let fixture: ComponentFixture<ProximasAgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProximasAgendasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximasAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
