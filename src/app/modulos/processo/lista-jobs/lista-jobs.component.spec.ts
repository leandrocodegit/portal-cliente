import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaJobsComponent } from './lista-jobs.component';

describe('ListaJobsComponent', () => {
  let component: ListaJobsComponent;
  let fixture: ComponentFixture<ListaJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
