import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLandingComponent } from './lesson-landing.component';

describe('LessonLandingComponent', () => {
  let component: LessonLandingComponent;
  let fixture: ComponentFixture<LessonLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
