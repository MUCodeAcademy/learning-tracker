
import { RootState } from '..';

export const getUserRole = (state: RootState) => state.user.currentuser.role
export const getUserEmail = (state: RootState) => state.user.currentuser.email
export const getUserId = (state: RootState) => state.user.currentuser.id
export const getUserList = (state: RootState) => state.user.userList
export const getUserInfo = (state: RootState) => state.user.currentuser