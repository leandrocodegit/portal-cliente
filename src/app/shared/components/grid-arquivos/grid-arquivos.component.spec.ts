import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridArquivosComponent } from './grid-arquivos.component';

describe('GridArquivosComponent', () => {
  let component: GridArquivosComponent;
  let fixture: ComponentFixture<GridArquivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridArquivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridArquivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
