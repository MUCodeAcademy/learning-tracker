import { createAction, props } from "@ngrx/store";
import { InstructorQuestion } from "../../interfaces/instructorquestion.interface";

export const setInstructorQuestions = createAction(
  "[InstructorQuestion State] Set InstructorQuestions",
  props<{ instructorQuestions: InstructorQuestion[] }>()
);
export const addInstructorQuestion = createAction(
  "[InstructorQuestion State] Add InstructorQuestion",
  props<{ instructorQuestion: InstructorQuestion }>()
);
export const clearInstructorQuestions = createAction(
  "[InstructorQuestion State Clear InstructorQuestions"
);
