import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top5ProcessosComponent } from './top-5-processos.component';

describe('Top5ProcessosComponent', () => {
  let component: Top5ProcessosComponent;
  let fixture: ComponentFixture<Top5ProcessosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top5ProcessosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top5ProcessosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
