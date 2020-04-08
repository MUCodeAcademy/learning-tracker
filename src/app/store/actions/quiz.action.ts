import { createAction, props } from "@ngrx/store";
import {InstructorQuestion} from "src/app/interfaces/instructorquestion.interface";

export const getQuizzes = createAction( "[QUIZ STATE] Get Quizzes", props<{ quizzes: InstructorQuestion[] }>()
);

export const clearQuizzes = createAction("[QUIZ STATE clear Quizzes", props<{ quiz: InstructorQuestion}>());

export const editQuizzes = createAction("[QUIZ STATE put Quizzes", props<{ quiz: InstructorQuestion}>());

export const createQuizzes = createAction("[QUIZ STATE post Quizzes", props<{ quiz: InstructorQuestion}>());