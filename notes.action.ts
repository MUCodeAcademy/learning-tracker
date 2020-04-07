import { createAction, props } from '@ngrx/store';
import { Note } from '../../interfaces/Notes.interface';

export const editNotes = createAction('[NOTE STATE] Update Notes', props<{notes: Note}>());
export const addNotes = createAction('[NOTE STATE] Add Notes', props<{note: Note}>());
export const deleteNote = createAction('[NOTE STATE Delete Note]');