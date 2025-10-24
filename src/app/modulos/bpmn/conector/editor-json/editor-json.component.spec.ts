import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorJsonComponent } from './editor-json.component';

describe('EditorJsonComponent', () => {
  let component: EditorJsonComponent;
  let fixture: ComponentFixture<EditorJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorJsonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
