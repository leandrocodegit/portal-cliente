import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsModelosComponent } from './tabs-modelos.component';

describe('TabsModelosComponent', () => {
  let component: TabsModelosComponent;
  let fixture: ComponentFixture<TabsModelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsModelosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
