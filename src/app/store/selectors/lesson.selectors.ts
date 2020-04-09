import { RootState } from '..';
import { state } from '@angular/animations';

export const getLessons = (state: RootState) => state.lessons.lessons
export const getViewedLesson = (state: RootState) => state.lessons.viewedLesson