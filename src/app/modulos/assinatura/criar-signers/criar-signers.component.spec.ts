import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarSignersComponent } from './criar-signers.component';

describe('CriarSignersComponent', () => {
  let component: CriarSignersComponent;
  let fixture: ComponentFixture<CriarSignersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarSignersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarSignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
