import {
  FETCH_MOVIE_REQUEST,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILURE,
  MovieInfo,
  MovieActionTypes,
} from "./movieTypes";

// Uses MovieInfo interface for state.
// The initial state of the reducer is set to:
const initialState: MovieInfo = {
  loading: false,
  error: "",
  movie: {
    genre: [],
    reviews: [],
    _id: "",
    title: "",
    poster_path: "",
    desc: "",
    budget: -1,
    release_date: "",
    duration: -1,
    averageRating: -1,
  },
};

// Reducer takes in state and action and returns a state in the form of the MovieInfo interface.
const movieReducer = (
  state = initialState,
  action: MovieActionTypes
): MovieInfo => {
  // Switch an the type of action it takes in.
  // The different cases are quite self-explanetory
  switch (action.type) {
    case FETCH_MOVIE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        movie: action.payload,
        error: "",
      };
    case FETCH_MOVIE_FAILURE:
      return {
        ...state,
        loading: false,
        movie: initialState.movie,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
