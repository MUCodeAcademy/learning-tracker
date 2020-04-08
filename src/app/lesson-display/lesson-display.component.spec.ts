import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDisplayComponent } from './lesson-display.component';

describe('LessonDisplayComponent', () => {
  let component: LessonDisplayComponent;
  let fixture: ComponentFixture<LessonDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
