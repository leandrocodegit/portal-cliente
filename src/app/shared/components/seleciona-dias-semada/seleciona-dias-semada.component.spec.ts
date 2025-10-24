import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionaDiasSemadaComponent } from './seleciona-dias-semada.component';

describe('SelecionaDiasSemadaComponent', () => {
  let component: SelecionaDiasSemadaComponent;
  let fixture: ComponentFixture<SelecionaDiasSemadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionaDiasSemadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionaDiasSemadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
