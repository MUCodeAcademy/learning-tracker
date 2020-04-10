import { RootState } from '..'

export const getQuiz = (state: RootState) => state.quizzes.quizzes
export const getViewedQuiz = (state: RootState) => state.quizzes.viewedquiz


