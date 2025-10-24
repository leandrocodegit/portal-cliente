import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorUsuariosComponent } from './seletor-usuarios.component';

describe('SeletorUsuariosComponent', () => {
  let component: SeletorUsuariosComponent;
  let fixture: ComponentFixture<SeletorUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeletorUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeletorUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
