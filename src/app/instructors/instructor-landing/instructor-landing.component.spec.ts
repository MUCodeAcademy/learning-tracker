import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorLandingComponent } from './instructor-landing.component';

describe('InstructorLandingComponent', () => {
  let component: InstructorLandingComponent;
  let fixture: ComponentFixture<InstructorLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
