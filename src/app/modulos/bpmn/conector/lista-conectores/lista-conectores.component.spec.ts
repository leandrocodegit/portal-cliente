import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConectoresComponent } from './lista-conectores.component';

describe('ListaConectoresComponent', () => {
  let component: ListaConectoresComponent;
  let fixture: ComponentFixture<ListaConectoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaConectoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
