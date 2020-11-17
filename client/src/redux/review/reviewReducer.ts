import {
  DELETE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEW_FAILURE,
  FETCH_REVIEW_REQUEST,
  FETCH_REVIEW_SUCCESS,
  POST_REVIEW_FAILURE,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
  ReviewActionTypes,
  ReviewInfo,
  UPDATE_REVIEW_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
} from "./reviewTypes";

// Uses ReviewInfo interface for state.
// The initial state of the reducer is set to:
const initialState: ReviewInfo = {
  loading: false,
  error: "",
  reviews: [],
  viewingReview: {
    _id: "",
    rating: -1,
    text: "",
    movieID: "",
    userID: "",
    username: "",
    movieTitle: "",
  },
};

// Reducer takes in state and action and returns a state in the form of the ReviewInfo interface.
const reviewReducer = (
  state = initialState,
  action: ReviewActionTypes
): ReviewInfo => {
  // Switch an the type of action it takes in.
  // The different cases are quite self-explanetory
  switch (action.type) {
    case POST_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case POST_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case UPDATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case UPDATE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case DELETE_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        reviews: action.payload,
      };
    case FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case FETCH_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        viewingReview: action.payload,
      };
    case FETCH_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reviewReducer;
