import {
    SET_SORT_DIRECTION_ASCENDING,
    SET_SORT_DIRECTION_DESCENDING,
    SET_SORT_TYPE_BUDGET,
    SET_SORT_TYPE_DURATION,
    SET_SORT_TYPE_TITLE,
    Sort,
    SortActionTypes,
} from "./sortTypes";

// Uses Sort interface for state.
// The initial state of the reducer is set to:
const initialState: Sort = {
    type: "title",
    descending: true,
};

// Reducer takes in state and action and returns a state in the form of the Sort interface.
const sortReducer = (state = initialState, action: SortActionTypes): Sort => {
    // Switch an the type of action it takes in.
    // The different cases are quite self-explanetory
    switch (action.type) {
        case SET_SORT_TYPE_TITLE:
            return {
                ...state,
                type: "title",
            };
        case SET_SORT_TYPE_DURATION:
            return {
                ...state,
                type: "duration",
            };
        case SET_SORT_TYPE_BUDGET:
            return {
                ...state,
                type: "budget",
            };
        case SET_SORT_DIRECTION_ASCENDING:
            return {
                ...state,
                descending: false,
            };
        case SET_SORT_DIRECTION_DESCENDING:
            return {
                ...state,
                descending: true,
            };
        default:
            return state;
    }
};

export default sortReducer;
