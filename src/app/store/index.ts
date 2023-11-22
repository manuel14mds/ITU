import { ActionReducerMap } from "@ngrx/store";
import { USER_FEATURE_NAME, authReducer, state } from "./user/user.reducer";

interface AppState{
    [USER_FEATURE_NAME]: state
}

export const appReducer: ActionReducerMap<AppState> = {
    [USER_FEATURE_NAME]: authReducer
}