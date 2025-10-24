import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancarComponent } from './avancar.component';

describe('AvancarComponent', () => {
  let component: AvancarComponent;
  let fixture: ComponentFixture<AvancarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvancarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
