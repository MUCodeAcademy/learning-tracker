import * as Reducers from "./reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface RootState {
<<<<<<< HEAD
  user: Reducers.UserState;
  lessons: Reducers.LessonState;
  retentions: Reducers.RetentionState;
  instructorQuestions: Reducers.InstructorQuestionState;
=======
  user: Reducers.UserState,
  lessons: Reducers.LessonState,
  retentions: Reducers.RetentionState,
  instructorQuestions: Reducers.InstructorQuestionState,
  cohort: Reducers.CohortState
>>>>>>> fixes error with merge conflict
}

export const reducers: ActionReducerMap<RootState> = {
  user: Reducers.userReducer,
  lessons: Reducers.lessonReducer,
  retentions: Reducers.retentionReducer,
  instructorQuestions: Reducers.instructorQuestionReducer,
};
