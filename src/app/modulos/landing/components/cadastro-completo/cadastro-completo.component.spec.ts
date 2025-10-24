import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCompletoComponent } from './cadastro-completo.component';

describe('CadastroCompletoComponent', () => {
  let component: CadastroCompletoComponent;
  let fixture: ComponentFixture<CadastroCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCompletoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
