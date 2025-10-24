import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPaginasComponent } from './lista-paginas.component';

describe('ListaPaginasComponent', () => {
  let component: ListaPaginasComponent;
  let fixture: ComponentFixture<ListaPaginasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPaginasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
