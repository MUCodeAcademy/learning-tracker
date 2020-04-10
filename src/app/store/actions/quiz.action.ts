import { createAction, props } from "@ngrx/store";
import { Quiz } from "../../interfaces/quiz.interface";

export const getQuizzes = createAction("[QUIZ STATE] Get Quizzes", props<{ quizzes: Quiz[] }>());
export const setViewedQuiz = createAction('[QUIZ STATE] Set Viewed Quiz', props<{ viewedquiz: string}>())
export const clearQuizzes = createAction("[QUIZ STATE] Clear Quizzes");
export const addQuiz = createAction("[QUIZ STATE] Add Quiz", props<{ quiz: Quiz }>());