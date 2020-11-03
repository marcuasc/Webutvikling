/*

This file exports action creators for the different types. Used to trigger actions in the redux store.
Some have payloads that correspond to the action.

*/

import {
    CLOSE_RESULT_MODAL,
    OPEN_RESULT_MODAL,
    ResultActionTypes,
    FETCH_MOVIE_REQUEST,
    FETCH_MOVIE_SUCCESS,
    FETCH_MOVIE_FAILURE,
    Result,
    PUT_RATINGS_REQUEST,
    PUT_RATINGS_SUCCESS,
    PUT_RATINGS_FAILURE,
} from "./resultTypes";
import Axios from "axios";
import { Dispatch } from "redux";

export const openResultModal = (id: string): ResultActionTypes => {
    return {
        type: OPEN_RESULT_MODAL,
        payload: id,
    };
};

export const closeResultModal = (): ResultActionTypes => {
    return {
        type: CLOSE_RESULT_MODAL,
    };
};

const fetchMovieRequest = (): ResultActionTypes => {
    return {
        type: FETCH_MOVIE_REQUEST,
    };
};

const fetchMovieSuccess = (movie: Result): ResultActionTypes => {
    return {
        type: FETCH_MOVIE_SUCCESS,
        payload: movie,
    };
};

const fetchMovieFailure = (error: string): ResultActionTypes => {
    return {
        type: FETCH_MOVIE_FAILURE,
        payload: error,
    };
};

const putRatingsRequest = (ratings: Array<number>): ResultActionTypes => {
    return {
        type: PUT_RATINGS_REQUEST,
        payload: ratings,
    };
};

const putRatingsSuccess = (): ResultActionTypes => {
    return {
        type: PUT_RATINGS_SUCCESS,
    };
};

const putRatingsFailure = (error: string): ResultActionTypes => {
    return {
        type: PUT_RATINGS_FAILURE,
        payload: error,
    };
};

// Async action to fetch a movie on id.
export const fetchMovie = (id: string) => {
    return (dispatch: Dispatch) => {
        // First, dispatch a fetchMovieRequest
        dispatch(fetchMovieRequest());
        // Then, try to get on /movie/id/ + the id of the movie to get.
        Axios.get("http://localhost:5000/movie/id/" + id)
            .then((response) => {
                // If it works, extract the movie from the response, dispatch MovieSuccess with the movie as input
                const data = response.data.data[0];
                dispatch(fetchMovieSuccess(data));
            })
            .catch((error) => {
                // If it fails, dispatch MovieFailure, with the errorMsg extracted from the response.
                const errorMsg = error.message;
                dispatch(fetchMovieFailure(errorMsg));
            });
    };
};

// Async action to put ratings on a movie on id.
export const putRatings = (ratings: Array<number>, id: string) => {
    // Takes in list of ratings and id of movie to put on
    return (dispatch: Dispatch) => {
        // First dispatch putRatingsRequest with the ratings as input.
        dispatch(putRatingsRequest(ratings));
        // Then try to put on /movie/id/ + id of the movie to put on with the ratings as what to put on it.
        Axios.put("http://localhost:5000/movie/id/" + id, {
            ratings: ratings,
        })
            .then(() => {
                // If it works, dispatch RatingsSuccess then dispatch a new fetching of current movie.
                dispatch(putRatingsSuccess());
                dispatch(fetchMovie(id) as any);
            })
            .catch((error) => {
                // If it fails, dispatch RatingsFailure, with the errorMsg extracted from the response.
                const errorMsg = error.message;
                dispatch(putRatingsFailure(errorMsg));
            });
    };
};
