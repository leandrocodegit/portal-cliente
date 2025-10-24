import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReabrirProtocoloComponent } from './reabrir-protocolo.component';

describe('ReabrirProtocoloComponent', () => {
  let component: ReabrirProtocoloComponent;
  let fixture: ComponentFixture<ReabrirProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReabrirProtocoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReabrirProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
