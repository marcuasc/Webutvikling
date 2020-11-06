import { combineReducers } from "redux";
import searchReducer from "./search/searchReducer";
import filterReducer from "./filter/filterReducer";
import sortReducer from "./sort/sortReducer";
import movieReducer from "./movie/movieReducer";

// Creates a root reducer from all the reducers.
const rootReducer = combineReducers({
  search: searchReducer,
  filter: filterReducer,
  sort: sortReducer,
  movieInfo: movieReducer,
});

export default rootReducer;
