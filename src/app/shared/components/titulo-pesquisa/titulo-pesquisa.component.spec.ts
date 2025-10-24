import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloPesquisaComponent } from './titulo-pesquisa.component';

describe('TituloPesquisaComponent', () => {
  let component: TituloPesquisaComponent;
  let fixture: ComponentFixture<TituloPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloPesquisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
