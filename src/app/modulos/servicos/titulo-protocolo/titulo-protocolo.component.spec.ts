import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloProtocoloComponent } from './titulo-protocolo.component';

describe('TituloProtocoloComponent', () => {
  let component: TituloProtocoloComponent;
  let fixture: ComponentFixture<TituloProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloProtocoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
