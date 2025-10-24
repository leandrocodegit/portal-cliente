import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDeployComponent } from './detalhes-deploy.component';

describe('DetalhesDeployComponent', () => {
  let component: DetalhesDeployComponent;
  let fixture: ComponentFixture<DetalhesDeployComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesDeployComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
