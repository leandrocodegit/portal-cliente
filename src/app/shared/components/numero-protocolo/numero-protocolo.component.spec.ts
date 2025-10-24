import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroProtocoloComponent } from './numero-protocolo.component';

describe('NumeroProtocoloComponent', () => {
  let component: NumeroProtocoloComponent;
  let fixture: ComponentFixture<NumeroProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumeroProtocoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumeroProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
