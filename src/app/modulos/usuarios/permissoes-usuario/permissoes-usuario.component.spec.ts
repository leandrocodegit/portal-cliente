import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissoesUsuarioComponent } from './permissoes-usuario.component';

describe('PermissoesUsuarioComponent', () => {
  let component: PermissoesUsuarioComponent;
  let fixture: ComponentFixture<PermissoesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissoesUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissoesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
