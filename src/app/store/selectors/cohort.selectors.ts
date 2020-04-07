import { RootState } from '..';

export const getCohortId = (state: RootState) => state.cohort.cohortId
export const getCohortName = (state: RootState) => state.cohort.cohortName
export const getCohortInstructorId = (state: RootState) => state.cohort.cohortInstructorId
export const getCohort = (state: RootState) => state.cohort
