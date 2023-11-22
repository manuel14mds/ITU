import {  createReducer, on } from "@ngrx/store";
import { User } from "src/app/model/user";
import { UserActions } from "./user.actions";

export const USER_FEATURE_NAME = 'userReducer'

export interface state {
    authUser: User | null;
}

const initialState: state = {
    authUser: null
}

export const authReducer = createReducer(initialState,
    on(UserActions.setUser, (state, {data})=>({...state, authUser:data})),

    on(UserActions.resetUserState,()=> initialState)
    )