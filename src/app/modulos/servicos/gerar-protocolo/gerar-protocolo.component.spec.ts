import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarProtocoloComponent } from './gerar-protocolo.component';

describe('GerarProtocoloComponent', () => {
  let component: GerarProtocoloComponent;
  let fixture: ComponentFixture<GerarProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerarProtocoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerarProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
