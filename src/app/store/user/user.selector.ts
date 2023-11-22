import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_FEATURE_NAME, state } from "./user.reducer";

export const selectUserState = createFeatureSelector<state>(USER_FEATURE_NAME)

export const selectUser = createSelector(selectUserState, (state)=> state.authUser)