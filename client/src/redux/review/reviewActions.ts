/*

This file exports action creators for the different types. Used to trigger actions in the redux store.
Some have payloads that correspond to the action.

*/

import Axios from "axios";
import { Dispatch } from "redux";
import { setAlert } from "../alert/alertActions";
import { fetchMovie } from "../movie/movieActions";
import {
  DELETE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  POST_REVIEW_FAILURE,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
  ReviewActionTypes,
  Review,
  UPDATE_REVIEW_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  RecievedReview,
  FETCH_REVIEW_FAILURE,
  FETCH_REVIEW_REQUEST,
  FETCH_REVIEW_SUCCESS,
} from "./reviewTypes";

Axios.defaults.adapter = require("axios/lib/adapters/http");

const postReviewRequest = (): ReviewActionTypes => {
  return {
    type: POST_REVIEW_REQUEST,
  };
};

const postReviewSuccess = (): ReviewActionTypes => {
  return {
    type: POST_REVIEW_SUCCESS,
  };
};

const postReviewFailure = (error: string): ReviewActionTypes => {
  return {
    type: POST_REVIEW_FAILURE,
    error: error,
  };
};

const updateReviewRequest = (): ReviewActionTypes => {
  return {
    type: UPDATE_REVIEW_REQUEST,
  };
};

const updateReviewSuccess = (): ReviewActionTypes => {
  return {
    type: UPDATE_REVIEW_SUCCESS,
  };
};

const updateReviewFailure = (error: string): ReviewActionTypes => {
  return {
    type: UPDATE_REVIEW_FAILURE,
    error: error,
  };
};

const deleteReviewRequest = (): ReviewActionTypes => {
  return {
    type: DELETE_REVIEW_REQUEST,
  };
};

const deleteReviewSuccess = (): ReviewActionTypes => {
  return {
    type: DELETE_REVIEW_SUCCESS,
  };
};

const deleteReviewFailure = (error: string): ReviewActionTypes => {
  return {
    type: DELETE_REVIEW_FAILURE,
    error: error,
  };
};

const fetchReviewsRequest = (): ReviewActionTypes => {
  return {
    type: FETCH_REVIEWS_REQUEST,
  };
};

const fetchReviewsSuccess = (reviews: Array<any>): ReviewActionTypes => {
  return {
    type: FETCH_REVIEWS_SUCCESS,
    payload: reviews,
  };
};

const fetchReviewsFailure = (error: string): ReviewActionTypes => {
  return {
    type: FETCH_REVIEWS_FAILURE,
    error: error,
  };
};

const fetchReviewRequest = (): ReviewActionTypes => {
  return {
    type: FETCH_REVIEW_REQUEST,
  };
};

const fetchReviewSuccess = (review: RecievedReview): ReviewActionTypes => {
  return {
    type: FETCH_REVIEW_SUCCESS,
    payload: review,
  };
};

const fetchReviewFailure = (error: string): ReviewActionTypes => {
  return {
    type: FETCH_REVIEW_FAILURE,
    error: error,
  };
};

const getConfig = (token: string) => {
  return {
    headers: { Authorization: token },
  };
};

// Async action that uses axios to post review.
export const postReview = (review: Review, token: string) => {
  // Takes in review object and token
  return (dispatch: Dispatch) => {
    // First dispatch postReviewRequest
    dispatch(postReviewRequest());
    // Then try to post review with axios. Sends the review object with a config object with the token.
    return Axios.post("http://localhost:5000/review/", review, getConfig(token))
      .then((response) => {
        // If it works
        // Dispatch postReviewSuccess
        dispatch(postReviewSuccess());
        // Dispatch fetchMovie so the movie in state is up to date.
        dispatch(fetchMovie(review.movieID) as any);
        // Set a success alert with fitting message
        dispatch(
          setAlert({ type: "success", message: "Successfully posted review!" })
        );
      })
      .catch((error) => {
        // If it fails, dispatch postReviewFailure, with the errorMsg extracted from the response.
        const errorMsg = error.message;
        dispatch(postReviewFailure(errorMsg));
        // Dispatch setAlert with type error and corresponding message.
        dispatch(setAlert({ type: "error", message: "Could not post review" }));
      });
  };
};

// Async action that uses axios to update review.
export const updateReview = (review: Review, id: string, token: string) => {
  // Takes in review object, id to put on, and token
  return (dispatch: Dispatch) => {
    // First dispatch updateReviewRequest
    dispatch(updateReviewRequest());
    // Declare the updatedReview
    const updatedReview = {
      rating: review.rating,
      text: review.text,
      movieID: review.movieID,
    };
    // Put on correct path with updatedReview and configobject with token.
    return Axios.put(
      "http://localhost:5000/review/" + id,
      updatedReview,
      getConfig(token)
    )
      .then((response) => {
        // If it works, dispatch updateReviewSuccess
        dispatch(updateReviewSuccess());
        // Disaptch success alert
        dispatch(
          setAlert({ type: "success", message: "Successfully updated review!" })
        );
        // Dispatch fetchReview on id so that the review in the state is updated
        dispatch(fetchReview(id) as any);
      })
      .catch((error) => {
        // If it fails, dispatch updateReviewFailure, with the errorMsg extracted from the response.
        const errorMsg = error.message;
        dispatch(updateReviewFailure(errorMsg));
        // Dispatch setAlert with type error and corresponding message.
        dispatch(
          setAlert({ type: "error", message: "Could not update review" })
        );
      });
  };
};

// Async action that uses axios to delete review.
export const deleteReview = (id: string, token: string) => {
  // Takes in id of review and token
  return (dispatch: Dispatch) => {
    // First, dispatch deleteReviewRequest
    dispatch(deleteReviewRequest());
    // Then try to delete on path with config object of token.
    return Axios.delete("http://localhost:5000/review/" + id, getConfig(token))
      .then((response) => {
        // If it works, dispatch deleteReviewSuccess
        dispatch(deleteReviewSuccess());
        // Dispatch success alert with message
        dispatch(
          setAlert({ type: "success", message: "Successfully deleted review!" })
        );
      })
      .catch((error) => {
        // If it fails, dispatch deleteReviewFailure, with the errorMsg extracted from the response.
        const errorMsg = error.message;
        dispatch(deleteReviewFailure(errorMsg));
        // Dispatch setAlert with type error and corresponding message.
        dispatch(
          setAlert({ type: "error", message: "Could not delete review" })
        );
      });
  };
};

// Async action that uses axios to delete review.
export const fetchReviews = (type: "movie" | "user", id: string) => {
  // Takes in type of either movie or user and id
  return (dispatch: Dispatch) => {
    // First, dispatch fetchReviewsRequest
    dispatch(fetchReviewsRequest());
    return Axios.get("http://localhost:5000/" + type + "/" + id + "/reviews/")
      .then((response) => {
        // If it works, dispatch fetchReviewsSuccess with the reviews in data in the response
        dispatch(fetchReviewsSuccess(response.data.reviews));
      })
      .catch((error) => {
        const errorMsg = error.message;
        // If it fails, dispatch fetchReviewsFailure, with the errorMsg extracted from the response.
        dispatch(fetchReviewsFailure(errorMsg));
        // Dispatch setAlert with type error and corresponding message.
        dispatch(
          setAlert({ type: "error", message: "Could not fetch reviews" })
        );
      });
  };
};

// Async action that uses axios to fetch a single review.
export const fetchReview = (id: string) => {
  // Takes in id of review
  return (dispatch: Dispatch) => {
    // First dispatch fetchReviewRequest
    dispatch(fetchReviewRequest());
    // Then try to get on correct path
    return Axios.get("http://localhost:5000/review/" + id)
      .then((response) => {
        // If it works, dispatch fetchReviewSuccess with the data of the response
        dispatch(fetchReviewSuccess(response.data));
      })
      .catch((error) => {
        // If it fails, dispatch fetchReviewFailure, with the errorMsg extracted from the response.
        const errorMsg = error.message;
        dispatch(fetchReviewFailure(errorMsg));
        // Dispatch setAlert with type error and corresponding message.
        dispatch(
          setAlert({ type: "error", message: "Could not fetch review" })
        );
      });
  };
};
