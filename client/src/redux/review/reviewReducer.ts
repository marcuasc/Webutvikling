import {
  DELETE_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  POST_REVIEW_FAILURE,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
  ReviewActionTypes,
  ReviewInfo,
  UPDATE_REVIEW_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
} from "./reviewTypes";

const initialState: ReviewInfo = {
  loading: false,
  error: "",
  reviews: [
    {
      _id: "123",
      rating: 5,
      text: "Bra film",
      movieID: "1234",
      userID: "12345",
    },
    {
      _id: "124",
      rating: 3,
      text: "Ok film",
      movieID: "1234",
      userID: "12345",
    },
    {
      _id: "125",
      rating: 4,
      text: "grei film",
      movieID: "1234",
      userID: "12345",
    },
  ],
};

const reviewReducer = (
  state = initialState,
  action: ReviewActionTypes
): ReviewInfo => {
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
    default:
      return state;
  }
};

export default reviewReducer;
