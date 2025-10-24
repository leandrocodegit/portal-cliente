import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSignerComponent } from './card-signer.component';

describe('CardSignerComponent', () => {
  let component: CardSignerComponent;
  let fixture: ComponentFixture<CardSignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSignerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
