import { combineReducers } from 'redux';
import socket from '@/store/socket';
import user from '@/store/user';

export const rootReducer = combineReducers({
  user,
  socket,
});

export type RootState = ReturnType<typeof rootReducer>;
