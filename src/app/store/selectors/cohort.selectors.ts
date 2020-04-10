import { RootState } from '..';

export const getCohortList = (state: RootState) => state.cohort.list
export const getCohortRosters = (state: RootState) => state.cohort.rosters