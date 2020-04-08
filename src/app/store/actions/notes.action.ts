import { createAction, props } from '@ngrx/store';
import { Note } from '../../interfaces/notes.interface';

export const getNotes = createAction('[NOTE STATE] Update Notes', props<{notes: Note[]}>());
export const addNote = createAction('[NOTE STATE] Add Note', props<{note: Note}>());
export const deleteNote = createAction('[NOTE STATE Delete Note]');