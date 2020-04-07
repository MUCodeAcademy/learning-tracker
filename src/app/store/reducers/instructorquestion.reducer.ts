import * as instructorQuestionActions from "../actions/instructorquestion.action";
import { createReducer, on, Action } from "@ngrx/store";
import { InstructorQuestion } from "src/app/interfaces/instructorquestion.interface";

export interface InstructorQuestionState {
  instructorQuestions: InstructorQuestion[];
}

export const initialInstructorQuestionState: InstructorQuestionState = {
  instructorQuestions: []
};

const reducer = createReducer(
  initialInstructorQuestionState,
  on(
    instructorQuestionActions.setInstructorQuestions,
    (state, { instructorQuestions }) => ({
      ...state,
      instructorQuestions: [...instructorQuestions]
    })
  ),

  on(
    instructorQuestionActions.addInstructorQuestion,
    (state, { instructorQuestion }) => ({
      ...state,
      instructorQuestions: [...state.instructorQuestions, instructorQuestion]
    })
  ),

  on(instructorQuestionActions.clearInstructorQuestions, state => ({
    ...initialInstructorQuestionState
  }))
);

export function instructorQuestionReducer(
  state: InstructorQuestionState,
  action: Action
) {
  return reducer(state, action);
}
