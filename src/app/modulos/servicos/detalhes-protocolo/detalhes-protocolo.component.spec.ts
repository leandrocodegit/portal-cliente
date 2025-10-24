import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesProtocoloComponent } from './detalhes-protocolo.component';

describe('DetalhesProtocoloComponent', () => {
  let component: DetalhesProtocoloComponent;
  let fixture: ComponentFixture<DetalhesProtocoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesProtocoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesProtocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
