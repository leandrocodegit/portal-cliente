import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCategoriasComponent } from './filtro-categorias.component';

describe('FiltroCategoriasComponent', () => {
  let component: FiltroCategoriasComponent;
  let fixture: ComponentFixture<FiltroCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
