import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanciasProtocoloComponent } from './instancias-protocolo.component';

describe('InstanciasProtocoloComponent', () => {
  let component: InstanciasProtocoloComponent;
  let fixture: ComponentFixture<InstanciasProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstanciasProtocoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstanciasProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
