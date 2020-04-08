import * as Reducers from "./reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface RootState {
  user: Reducers.UserState;
  lessons: Reducers.LessonState;
  retentions: Reducers.RetentionState;
  instructorQuestions: Reducers.InstructorQuestionState;
  cohort: Reducers.CohortState;
  notes: Reducers.NoteState;
  quizzes: Reducers.QuizState;
}

export const reducers: ActionReducerMap<RootState> = {
  user: Reducers.userReducer,
  lessons: Reducers.lessonReducer,
  retentions: Reducers.retentionReducer,
  instructorQuestions: Reducers.instructorQuestionReducer,
  cohort: Reducers.cohortReducer,
  notes: Reducers.noteReducer,
  quizzes: Reducers.quizReducer,
};
