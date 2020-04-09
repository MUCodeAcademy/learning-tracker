import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorQuestionComponent } from './instructor-question.component';

describe('InstructorQuestionComponent', () => {
  let component: InstructorQuestionComponent;
  let fixture: ComponentFixture<InstructorQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
