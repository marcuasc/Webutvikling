/*

This file creates the necessary types for Movie info actions. 
It also creates interfaces for the different actions and combines them to a single ActionTypes type which is exported .

Also reates an interface for MovieInfo state.

*/

export const OPEN_MOVIE_DIALOG = "OPEN_MOVIE_DIALOG";
export const CLOSE_MOVIE_DIALOG = "CLOSE_MOVIE_DIALOG";

export const FETCH_MOVIE_REQUEST = "FETCH_MOVIE_REQUEST";
export const FETCH_MOVIE_SUCCESS = "FETCH_MOVIE_SUCCESS";
export const FETCH_MOVIE_FAILURE = "FETCH_MOVIE_FAILURE";

export const PUT_RATINGS_REQUEST = "PUT_RATINGS_REQUEST";
export const PUT_RATINGS_SUCCESS = "PUT_RATINGS_SUCCESS";
export const PUT_RATINGS_FAILURE = "PUT_RATINGS_FAILURE";

interface FetchMovieRequestAction {
  type: typeof FETCH_MOVIE_REQUEST;
}
interface FetchMovieSuccessAction {
  type: typeof FETCH_MOVIE_SUCCESS;
  payload: Movie;
}
interface FetchMovieFailureAction {
  type: typeof FETCH_MOVIE_FAILURE;
  payload: string;
}

export interface Movie {
  genre: Array<string>;
  reviews: Array<string>;
  _id: string;
  title: string;
  poster_path: string;
  desc: string;
  budget: number;
  release_date: string;
  duration: number;
  averageRating: number;
}

export interface MovieInfo {
  loading: boolean;
  error: string;
  movie: Movie;
}

export type MovieActionTypes =
  | FetchMovieFailureAction
  | FetchMovieRequestAction
  | FetchMovieSuccessAction;
