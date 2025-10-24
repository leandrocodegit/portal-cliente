import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLixeiraComponent } from './lista-lixeira.component';

describe('ListaLixeiraComponent', () => {
  let component: ListaLixeiraComponent;
  let fixture: ComponentFixture<ListaLixeiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaLixeiraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLixeiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
