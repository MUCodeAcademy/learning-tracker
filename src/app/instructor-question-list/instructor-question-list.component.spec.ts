import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorQuestionListComponent } from './instructor-question-list.component';

describe('InstructorQuestionListComponent', () => {
  let component: InstructorQuestionListComponent;
  let fixture: ComponentFixture<InstructorQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
