import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicoListaServicosComponent } from './publico-lista-servicos.component';

describe('PublicoListaServicosComponent', () => {
  let component: PublicoListaServicosComponent;
  let fixture: ComponentFixture<PublicoListaServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicoListaServicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicoListaServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
