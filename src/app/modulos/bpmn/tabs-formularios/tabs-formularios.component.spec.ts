import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsFormulariosComponent } from './tabs-formularios.component';

describe('TabsFormulariosComponent', () => {
  let component: TabsFormulariosComponent;
  let fixture: ComponentFixture<TabsFormulariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsFormulariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
