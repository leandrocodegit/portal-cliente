import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProtocolosComponent } from './lista-protocolos.component';

describe('ListaProtocolosComponent', () => {
  let component: ListaProtocolosComponent;
  let fixture: ComponentFixture<ListaProtocolosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProtocolosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProtocolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
