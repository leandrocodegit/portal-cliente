import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartProcessoComponent } from './start-processo.component';

describe('StartProcessoComponent', () => {
  let component: StartProcessoComponent;
  let fixture: ComponentFixture<StartProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartProcessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
