/*

This file exports action creators for the different types. Used to trigger actions in the redux store.
Some have payloads that correspond to the action.

*/

import {
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE,
  OPEN_MOVIE_DIALOG,
  CLOSE_MOVIE_DIALOG,
  Movie,
  MovieActionTypes,
} from "./movieTypes";
import Axios from "axios";
import { Dispatch } from "redux";

export const openMovieDialog = (id: string): MovieActionTypes => {
  return {
    type: OPEN_MOVIE_DIALOG,
    payload: id,
  };
};

export const closeMovieDialog = (): MovieActionTypes => {
  return {
    type: CLOSE_MOVIE_DIALOG,
  };
};

const fetchMovieRequest = (): MovieActionTypes => {
  return {
    type: FETCH_MOVIE_REQUEST,
  };
};

const fetchMovieSuccess = (movie: Movie): MovieActionTypes => {
  return {
    type: FETCH_MOVIE_SUCCESS,
    payload: movie,
  };
};

const fetchMovieFailure = (error: string): MovieActionTypes => {
  return {
    type: FETCH_MOVIE_FAILURE,
    payload: error,
  };
};

// Async action to fetch a movie on id.
export const fetchMovie = (id: string) => {
  return (dispatch: Dispatch) => {
    // First, dispatch a fetchMovieRequest
    dispatch(fetchMovieRequest());
    // Then, try to get on /movie/id/ + the id of the movie to get.
    Axios.get("http://localhost:5000/movie/" + id)
      .then((response) => {
        // If it works, extract the movie from the response, dispatch MovieSuccess with the movie as input
        let movie = response.data.movie;
        movie.avarageRating = response.data.avarageRating;
        console.log(movie);
        dispatch(fetchMovieSuccess(movie));
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
  };
};
