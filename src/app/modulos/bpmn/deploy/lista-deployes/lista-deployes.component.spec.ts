import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeployesComponent } from './lista-deployes.component';

describe('ListaDeployesComponent', () => {
  let component: ListaDeployesComponent;
  let fixture: ComponentFixture<ListaDeployesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeployesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeployesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
