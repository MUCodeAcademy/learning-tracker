import * as notesActions from '../actions/notes.action'
import { createReducer, on, Action } from '@ngrx/store';
import { Note } from '../../interfaces/notes.interface'

export interface NoteState {
    notes: Note []
}

export const initialNoteState: NoteState = {
    notes: []
}

const reducer = createReducer(initialNoteState,
    on(notesActions.getNotes, (state, {notes}) => ({...state, notes: [...state.notes, ...notes]})),
    on(notesActions.addNote, (state, {note}) => ({...state, notes:[...state.notes, note]})),
    on(notesActions.deleteNote, (state) => ({...initialNoteState}))
    )


export function noteReducer(state: NoteState, action: Action){
    return reducer(state, action);
}