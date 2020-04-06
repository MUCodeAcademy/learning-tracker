import { createAction, props } from '@ngrx/store';
import { Note } from 'src/app/interfaces/Notes.interface';

export const getNotes = createAction('[NOTE STATE] Get Notes', props<{notes: Note}>());
export const addNote = createAction('[NOTE STATE] Get Notes', props<{note: Note}>());
export const clearNote = createAction('[NOTE STATE Clear Notes]');