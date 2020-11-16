import {
  FETCH_RESULTS_FAILURE,
  FETCH_RESULTS_REQUEST,
  FETCH_RESULTS_SUCCESS,
  UPDATE_SEARCH_QUERY,
  Search,
  SearchActionTypes,
  UPDATE_CURRENT_PAGE,
  UPDATE_TOTAL_PAGES,
  RESET_SEARCH,
} from "./searchTypes";

// Uses Search interface for state.
// The initial state of the reducer is set to:
const initialState: Search = {
  loading: false,
  results: [],
  error: "",
  query: "",
  totalPages: 1,
  currentPage: 1,
};

// Reducer takes in state and action and returns a state in the form of the Search interface.
const searchReducer = (
  state = initialState,
  action: SearchActionTypes
): Search => {
  // Switch an the type of action it takes in.
  // The different cases are quite self-explanetory
  switch (action.type) {
    case FETCH_RESULTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        error: "",
      };
    case FETCH_RESULTS_FAILURE:
      return {
        ...state,
        loading: false,
        results: [],
        error: action.payload,
      };
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
        currentPage: 1,
      };
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case UPDATE_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.payload,
      };
    case RESET_SEARCH:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
