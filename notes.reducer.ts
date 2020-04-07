import * as notesActions from '../actions/notes.action'
import { createReducer, on, Action } from '@ngrx/store';
import { Note } from '../../interfaces/Notes.interface'

export interface NoteState {
    notes: Note []
}

export const initialNoteState: NoteState = {
    notes: []
}

const reducer = createReducer(initialNoteState,
    on(notesActions.editNotes, (state, {notes}) => ({...state, id: notes.id, user_id: notes.user_id, lesson_id: notes.lesson_id, cohort_id: notes.cohort_id, instructor_id: notes.instructor_id, note_text: notes.note_text, note_read: notes.note_read})),
    on(notesActions.addNotes, (state, {note}) => ({...state, notes:[...state.notes, note]})),
    on(notesActions.deleteNote, (state) => ({...initialNoteState}))
    )


export function noteReducer(state: NoteState, action: Action){
    return reducer(state, action);
}