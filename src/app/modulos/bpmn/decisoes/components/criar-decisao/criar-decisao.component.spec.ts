import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarDecisaoComponent } from './criar-decisao.component';

describe('CriarDecisaoComponent', () => {
  let component: CriarDecisaoComponent;
  let fixture: ComponentFixture<CriarDecisaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarDecisaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarDecisaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
