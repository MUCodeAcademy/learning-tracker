import { createAction, props } from "@ngrx/store";
import {Quiz} from "src/app/interfaces/quiz.interface";

export const getQuizzes = createAction( "[QUIZ STATE] Get Quizzes", props<{ quizzes: Quiz[] }>()
);

export const clearQuizzes = createAction("[QUIZ STATE clear Quizzes", props<{ quiz: Quiz}>());


export const createQuizzes = createAction("[QUIZ STATE post Quizzes", props<{ quiz: Quiz}>());