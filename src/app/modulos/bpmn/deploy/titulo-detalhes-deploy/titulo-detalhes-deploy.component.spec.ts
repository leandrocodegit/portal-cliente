import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloDetalhesDeployComponent } from './titulo-detalhes-deploy.component';

describe('TituloDetalhesDeployComponent', () => {
  let component: TituloDetalhesDeployComponent;
  let fixture: ComponentFixture<TituloDetalhesDeployComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloDetalhesDeployComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloDetalhesDeployComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
