import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsUsuarioComponent } from './tabs-usuario.component';

describe('TabsUsuarioComponent', () => {
  let component: TabsUsuarioComponent;
  let fixture: ComponentFixture<TabsUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
