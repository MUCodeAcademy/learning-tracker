import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizLandingComponent } from './quiz-landing.component';

describe('QuizLandingComponent', () => {
  let component: QuizLandingComponent;
  let fixture: ComponentFixture<QuizLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
