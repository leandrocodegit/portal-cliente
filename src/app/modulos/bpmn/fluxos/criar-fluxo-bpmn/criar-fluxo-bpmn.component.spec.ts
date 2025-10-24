import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarFluxoBpmnComponent } from './criar-fluxo-bpmn.component';

describe('CriarFluxoBpmnComponent', () => {
  let component: CriarFluxoBpmnComponent;
  let fixture: ComponentFixture<CriarFluxoBpmnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriarFluxoBpmnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarFluxoBpmnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
