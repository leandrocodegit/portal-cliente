import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaoFluxoComponent } from './visao-fluxo.component';

describe('VisaoFluxoComponent', () => {
  let component: VisaoFluxoComponent;
  let fixture: ComponentFixture<VisaoFluxoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisaoFluxoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaoFluxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
