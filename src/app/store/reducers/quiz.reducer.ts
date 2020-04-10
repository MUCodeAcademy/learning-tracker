import * as quizActions from '../actions/quiz.action'
import { createReducer, on, Action } from '@ngrx/store';
import { Quiz } from "../../interfaces/quiz.interface";

export interface QuizState {
    quizzes: Quiz[],
    viewedquiz: string
}

export const initialQuizState: QuizState = {
    quizzes: [],
    viewedquiz: ""
}

const reducer = createReducer(initialQuizState,
    on(quizActions.getQuizzes, (state, { quizzes }) => ({ ...state, quizzes: [...quizzes] })),
    on(quizActions.addQuiz, (state, { quiz }) => ({ ...state, quizzes: [...state.quizzes, quiz] })),
    on(quizActions.setViewedQuiz, (state, { viewedquiz }) => ({ ...state, viewedquiz: viewedquiz })),
    on(quizActions.clearQuizzes, (state) => ({ ...initialQuizState }))
)


export function quizReducer(state: QuizState, action: Action) {
    return reducer(state, action);
}