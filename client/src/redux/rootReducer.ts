import { combineReducers } from "redux";
import searchReducer from "./search/searchReducer";
import resultReducer from "./result/resultReducer";
import filterReducer from "./filter/filterReducer";
import sortReducer from "./sort/sortReducer";

// Creates a root reducer from all the reducers.
const rootReducer = combineReducers({
    search: searchReducer,
    result: resultReducer,
    filter: filterReducer,
    sortBy: sortReducer,
    resultInfo: resultReducer,
});

export default rootReducer;
