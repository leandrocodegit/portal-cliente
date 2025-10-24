import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproduzirArquivosComponent } from './reproduzir-arquivos.component';

describe('ReproduzirArquivosComponent', () => {
  let component: ReproduzirArquivosComponent;
  let fixture: ComponentFixture<ReproduzirArquivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReproduzirArquivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReproduzirArquivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
