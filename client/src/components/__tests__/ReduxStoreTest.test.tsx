import { openMovieDialog } from "../../redux/movie/movieActions";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store"; //ES6 modules

// Definerer mockstore-funksjonen med thunk
const middlewares: any = [thunk];
const mockStore = configureStore(middlewares);

//Definerer initial state
const initialState = {
  search: {
    loading: false,
    results: [],
    error: "",
    query: "",
    totalPages: 1,
    currentPage: 1,
  },
  filter: {
    open: false,
    filters: {},
  },
  sort: {
    type: "title",
    descending: true,
  },
  movieInfo: {
    open: false,
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
      avarageRating: -1,
    },
  },
};

//Definerer store fra ininital state
const store = mockStore(initialState);

test("Dispatches correct action in redux store", () => {
  store.dispatch(openMovieDialog("heijegerid"));

  const actions = store.getActions();
  const expectedPayload = { type: "OPEN_MOVIE_DIALOG", payload: "heijegerid" };
  expect(actions).toEqual([expectedPayload]);
});
