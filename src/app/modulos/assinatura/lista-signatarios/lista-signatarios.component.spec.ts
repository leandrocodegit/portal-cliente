import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSignatariosComponent } from './lista-signatarios.component';

describe('ListaSignatariosComponent', () => {
  let component: ListaSignatariosComponent;
  let fixture: ComponentFixture<ListaSignatariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSignatariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSignatariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
