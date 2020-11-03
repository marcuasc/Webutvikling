import {
    CLOSE_FILTER_DIALOG,
    Filter,
    FilterActionTypes,
    OPEN_FILTER_DIALOG,
    SET_FILTERS,
} from "./filterTypes";

// Uses Filter interface for state.
// The initial state of the reducer is set to:
const initialState: Filter = {
    open: false,
    filters: {},
};

// Reducer takes in state and action and returns a state in the form of the Filter interface.
const filterReducer = (
    state = initialState,
    action: FilterActionTypes
): Filter => {
    // Switch an the type of action it takes in.
    // The different cases are quite self-explanetory
    switch (action.type) {
        case SET_FILTERS:
            return {
                ...state,
                filters: action.payload,
            };
        case OPEN_FILTER_DIALOG:
            return {
                ...state,
                open: true,
            };
        case CLOSE_FILTER_DIALOG:
            return {
                ...state,
                open: false,
            };
        default:
            return state;
    }
};

export default filterReducer;
