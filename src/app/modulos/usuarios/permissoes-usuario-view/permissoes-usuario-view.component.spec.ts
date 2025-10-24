import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissoesUsuarioViewComponent } from './permissoes-usuario-view.component';

describe('PermissoesUsuarioViewComponent', () => {
  let component: PermissoesUsuarioViewComponent;
  let fixture: ComponentFixture<PermissoesUsuarioViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissoesUsuarioViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissoesUsuarioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
