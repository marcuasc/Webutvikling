/*

This file exports action creators for the different types. Used to trigger actions in the redux store.

*/

import {
    SET_SORT_DIRECTION_ASCENDING,
    SET_SORT_DIRECTION_DESCENDING,
    SET_SORT_TYPE_BUDGET,
    SET_SORT_TYPE_DURATION,
    SET_SORT_TYPE_TITLE,
    SortActionTypes,
} from "./sortTypes";

export const setSortTypeTitle = (): SortActionTypes => {
    return {
        type: SET_SORT_TYPE_TITLE,
    };
};

export const setSortTypeDuration = (): SortActionTypes => {
    return {
        type: SET_SORT_TYPE_DURATION,
    };
};

export const setSortTypeBudget = (): SortActionTypes => {
    return {
        type: SET_SORT_TYPE_BUDGET,
    };
};

export const setSortDirectionAscending = (): SortActionTypes => {
    return {
        type: SET_SORT_DIRECTION_ASCENDING,
    };
};

export const setSortDirectionDescending = (): SortActionTypes => {
    return {
        type: SET_SORT_DIRECTION_DESCENDING,
    };
};
