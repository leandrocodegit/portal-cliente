import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesInstanciaComponent } from './detalhes-instancia.component';

describe('DetalhesInstanciaComponent', () => {
  let component: DetalhesInstanciaComponent;
  let fixture: ComponentFixture<DetalhesInstanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesInstanciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
