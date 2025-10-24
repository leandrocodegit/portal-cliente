import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarSignerComponent } from './configurar-signer.component';

describe('ConfigurarSignerComponent', () => {
  let component: ConfigurarSignerComponent;
  let fixture: ComponentFixture<ConfigurarSignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurarSignerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarSignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
