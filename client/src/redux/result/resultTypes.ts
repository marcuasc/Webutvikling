/*

This file creates the necessary types for result info actions. 
It also creates interfaces for the different actions and combines them to a single ActionTypes type which is exported .

Also reates an interface for ResultInfo state.

*/

export const OPEN_RESULT_MODAL = "OPEN_RESULT_MODAL";
export const CLOSE_RESULT_MODAL = "CLOSE_RESULT_MODAL";

export const FETCH_MOVIE_REQUEST = "FETCH_MOVIE_REQUEST";
export const FETCH_MOVIE_SUCCESS = "FETCH_MOVIE_SUCCESS";
export const FETCH_MOVIE_FAILURE = "FETCH_MOVIE_FAILURE";

export const PUT_RATINGS_REQUEST = "PUT_RATINGS_REQUEST";
export const PUT_RATINGS_SUCCESS = "PUT_RATINGS_SUCCESS";
export const PUT_RATINGS_FAILURE = "PUT_RATINGS_FAILURE";

interface OpenResultModalAction {
    type: typeof OPEN_RESULT_MODAL;
    payload: string;
}

interface CloseResultModalAction {
    type: typeof CLOSE_RESULT_MODAL;
}
interface FetchMovieRequestAction {
    type: typeof FETCH_MOVIE_REQUEST;
}
interface FetchMovieSuccessAction {
    type: typeof FETCH_MOVIE_SUCCESS;
    payload: Result;
}
interface FetchMovieFailureAction {
    type: typeof FETCH_MOVIE_FAILURE;
    payload: string;
}

interface PutRatingsRequest {
    type: typeof PUT_RATINGS_REQUEST;
    payload: Array<number>;
}

interface PutRatingsSuccess {
    type: typeof PUT_RATINGS_SUCCESS;
}

interface PutRatingsFailure {
    type: typeof PUT_RATINGS_FAILURE;
    payload: string;
}

export interface Result {
    genre: Array<string>;
    ratings: Array<number>;
    _id: string;
    title: string;
    poster_path: string;
    desc: string;
    budget: number;
    release_date: string;
    duration: number;
}

export interface ResultInfo {
    open: boolean;
    loading: boolean;
    error: string;
    result: Result;
}

export type ResultActionTypes =
    | OpenResultModalAction
    | CloseResultModalAction
    | FetchMovieFailureAction
    | FetchMovieRequestAction
    | FetchMovieSuccessAction
    | PutRatingsRequest
    | PutRatingsSuccess
    | PutRatingsFailure;
