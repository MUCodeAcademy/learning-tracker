
import { RootState } from '..';

export const getUserRole = (state: RootState) => state.user.userRole
export const getUserEmail = (state: RootState) => state.user.userEmail
export const getUserId = (state: RootState) => state.user.userId
export const getUser = (state: RootState) => state.user