/*

This file creates the necessary types for sort actions. 
It also creates interfaces for the different actions and combines them to a single ActionTypes type which is exported .

Also reates an interface for Sort state.

*/

export const SET_SORT_TYPE_TITLE = "SET_SORT_TYPE_TITLE";
export const SET_SORT_TYPE_DURATION = "SET_SORT_TYPE_DURATION";
export const SET_SORT_TYPE_BUDGET = "SET_SORT_TYPE_BUDGET";
export const SET_SORT_DIRECTION_ASCENDING = "SET_SORT_DIRECTION_ASCENDING";
export const SET_SORT_DIRECTION_DESCENDING = "SET_SORT_DIRECTION_DESCENDING";

interface SetSortTypeTitleAction {
    type: typeof SET_SORT_TYPE_TITLE;
}

interface SetSortTypeDurationAction {
    type: typeof SET_SORT_TYPE_DURATION;
}

interface SetSortTypeBudgetAction {
    type: typeof SET_SORT_TYPE_BUDGET;
}

interface SetSortDirectionAscendingAction {
    type: typeof SET_SORT_DIRECTION_ASCENDING;
}

interface SetSortDirectionDescendingAction {
    type: typeof SET_SORT_DIRECTION_DESCENDING;
}

export interface Sort {
    type: "title" | "duration" | "budget";
    descending: boolean;
}

export type SortActionTypes =
    | SetSortTypeTitleAction
    | SetSortTypeDurationAction
    | SetSortTypeBudgetAction
    | SetSortDirectionAscendingAction
    | SetSortDirectionDescendingAction;
