import * as quizActions from '../actions/quiz.action'
import { createReducer, on, Action } from '@ngrx/store';
import {Quiz} from "src/app/interfaces/quiz.interface";

export interface Quiz {
    quizzes: Quiz []
}

export const initialQuiz: QuizState = {
    quizzes: []
}

const reducer = createReducer(initialQuizState,
    on(quizActions.getQuizzes, (state, {Quiz}) => ({...state, Quiz: [...state.Quiz, ...Quiz]})),
    on(quizActions.addQuiz, (state, {Quiz}) => ({...state, Quiz:[...state.Quiz, Quiz]})),
    on(quizActions.deleteQuiz, (state) => ({...initialQuizState}))
    )


export function quizReducer(state: QuizState, action: Action){
    return reducer(state, action);
}