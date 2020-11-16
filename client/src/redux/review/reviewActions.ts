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
} from "./reviewTypes";

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

const getConfig = (token: string) => {
  return {
    headers: { Authorization: token },
  };
};

export const postReview = (review: Review, token: string) => {
  return (dispatch: Dispatch) => {
    dispatch(postReviewRequest());
    Axios.post("http://localhost:5000/review/", review, getConfig(token))
      .then((response) => {
        dispatch(
          setAlert({ type: "success", message: "Successfully posted review!" })
        );
        dispatch(postReviewSuccess());
        dispatch(fetchMovie(review.movieID) as any);
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(setAlert({ type: "error", message: errorMsg }));
        dispatch(postReviewFailure(errorMsg));
      });
  };
};

export const updateReview = (review: RecievedReview, token: string) => {
  return (dispatch: Dispatch) => {
    dispatch(updateReviewRequest());
    const updatedReview = {
      rating: review.rating,
      text: review.text,
      movieID: review.movieID,
    };
    Axios.put(
      "http://localhost:5000/review/" + review._id,
      updatedReview,
      getConfig(token)
    )
      .then((response) => {
        dispatch(postReviewSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateReviewFailure(errorMsg));
      });
  };
};

export const deleteReview = (review: RecievedReview, token: string) => {
  return (dispatch: Dispatch) => {
    dispatch(deleteReviewRequest());
    Axios.delete("http://localhost:5000/review/" + review._id, getConfig(token))
      .then((response) => {
        dispatch(deleteReviewSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteReviewFailure(errorMsg));
      });
  };
};

export const fetchReviews = (type: "movie" | "user", id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchReviewsRequest());
    Axios.get("http://localhost:5000/" + type + "/" + id + "/reviews/")
      .then((response) => {
        dispatch(fetchReviewsSuccess(response.data.reviews));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchReviewsFailure(errorMsg));
      });
  };
};
