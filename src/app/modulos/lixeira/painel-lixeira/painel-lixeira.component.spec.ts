import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelLixeiraComponent } from './painel-lixeira.component';

describe('PainelLixeiraComponent', () => {
  let component: PainelLixeiraComponent;
  let fixture: ComponentFixture<PainelLixeiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelLixeiraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelLixeiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
