import { RootState } from "..";

export const getInstructorQuestions = (state: RootState) =>
  state.instructorQuestions.instructorQuestions;
