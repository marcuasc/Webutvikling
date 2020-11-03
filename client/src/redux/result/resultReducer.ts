import {
    CLOSE_RESULT_MODAL,
    FETCH_MOVIE_REQUEST,
    FETCH_MOVIE_SUCCESS,
    OPEN_RESULT_MODAL,
    FETCH_MOVIE_FAILURE,
    ResultActionTypes,
    ResultInfo,
    PUT_RATINGS_REQUEST,
    PUT_RATINGS_SUCCESS,
    PUT_RATINGS_FAILURE,
} from "./resultTypes";

// Uses ResultInfo interface for state.
// The initial state of the reducer is set to:
const initialState: ResultInfo = {
    open: false,
    loading: false,
    error: "",
    result: {
        genre: [],
        ratings: [],
        _id: "",
        title: "",
        poster_path: "",
        desc: "",
        budget: -1,
        release_date: "",
        duration: -1,
    },
};

// Reducer takes in state and action and returns a state in the form of the ResultInfo interface.
const resultReducer = (
    state = initialState,
    action: ResultActionTypes
): ResultInfo => {
    // Switch an the type of action it takes in.
    // The different cases are quite self-explanetory
    switch (action.type) {
        case OPEN_RESULT_MODAL:
            return {
                ...state,
                open: true,
                result: {
                    ...state.result,
                    _id: action.payload,
                },
            };
        case CLOSE_RESULT_MODAL:
            return {
                ...state,
                open: false,
            };
        case FETCH_MOVIE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_MOVIE_SUCCESS:
            return {
                ...state,
                loading: false,
                result: action.payload,
                error: "",
            };
        case FETCH_MOVIE_FAILURE:
            return {
                ...state,
                loading: false,
                result: initialState.result,
                error: action.payload,
            };
        case PUT_RATINGS_REQUEST:
            return {
                ...state,
            };
        case PUT_RATINGS_SUCCESS:
            return {
                ...state,
            };
        case PUT_RATINGS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default resultReducer;
