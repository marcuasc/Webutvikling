/*

This file exports action creators for the different types. Used to trigger actions in the redux store.
Some have payloads that correspond to the action.

*/

import {
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE,
  Movie,
  MovieActionTypes,
} from "./movieTypes";
import Axios from "axios";
import { Dispatch } from "redux";
import { fetchReviews } from "../review/reviewActions";
import { setAlert } from "../alert/alertActions";

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
        movie.averageRating = response.data.averageRating;
        dispatch(fetchMovieSuccess(movie));
        dispatch(fetchReviews("movie", id) as any);
      })
      .catch((response) => {
        // If it fails, dispatch MovieFailure, with the errorMsg extracted from the response.
        const errorMsg = response.message;
        dispatch(setAlert({ type: "error", message: "Could not fetch movie" }));
        dispatch(fetchMovieFailure(errorMsg));
      });
  };
};
