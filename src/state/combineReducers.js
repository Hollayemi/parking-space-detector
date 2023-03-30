import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/auth/Login';
import newPickup from './slices/pickup';

export const myReducers = combineReducers({
    loginReducer: loginReducer,
    newPickup: newPickup,
});
