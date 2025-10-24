import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TituloProcessoComponent } from './titulo-processo.component';

describe('TituloProcessoComponent', () => {
  let component: TituloProcessoComponent;
  let fixture: ComponentFixture<TituloProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TituloProcessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TituloProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
