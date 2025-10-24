import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessandoLoadComponent } from './processando-load.component';

describe('ProcessandoLoadComponent', () => {
  let component: ProcessandoLoadComponent;
  let fixture: ComponentFixture<ProcessandoLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessandoLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessandoLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
