import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioGridComponent } from './calendario-grid.component';

describe('CalendarioGridComponent', () => {
  let component: CalendarioGridComponent;
  let fixture: ComponentFixture<CalendarioGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
