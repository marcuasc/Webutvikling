import { combineReducers } from "redux";
import searchReducer from "./search/searchReducer";
import filterReducer from "./filter/filterReducer";
import sortReducer from "./sort/sortReducer";
import movieReducer from "./movie/movieReducer";
import userReducer from "./user/userReducer";
import reviewReducer from "./review/reviewReducer";

// Creates a root reducer from all the reducers.
const rootReducer = combineReducers({
  search: searchReducer,
  filter: filterReducer,
  sort: sortReducer,
  movieInfo: movieReducer,
  userInfo: userReducer,
  reviewInfo: reviewReducer,
});

export default rootReducer;
