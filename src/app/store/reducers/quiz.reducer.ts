import * as notesActions from '../actions/notes.action'
import { createReducer, on, Action } from '@ngrx/store';
import {InstructorQuestion} from "src/app/interfaces/instructorquestion.interface";

export interface InstructorQuestionState {
    notes: InstructorQuestion []
}

export const initialInstructorQuestionState: InstructorQuestionState = {
    notes: []
}

const reducer = createReducer(initialInstructorQuestionState,
    on(notesActions.getInstructorQuestions, (state, {InstructorQuestions}) => ({...state, InstructorQuestions: [...state.InstructorQuestions, ...InstructorQuestions]})),
    on(notesActions.addInstructorQuestion, (state, {InstructorQuestion}) => ({...state, InstructorQuestions:[...state.InstructorQuestions, InstructorQuestion]})),
    on(notesActions.deleteInstructorQuestion, (state) => ({...initialInstructorQuestionState}))
    )


export function noteReducer(state: InstructorQuestionState, action: Action){
    return reducer(state, action);
}