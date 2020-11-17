import { closeAlert, setAlert } from "../../redux/alert/alertActions";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import alertReducer from "../../redux/alert/alertReducer";

// Defines mockstore-function with thunk
const middlewares: any = [thunk];
const mockStore = configureStore(middlewares);

//Defines initial state
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
  },
  userInfo: {
    loggedIn: false,
    loading: false,
    error: "",
    user: {
      username: "",
      userID: "",
      token: "",
      expires: 0,
    },
  },
  reviewInfo: {
    loading: false,
    error: "",
    reviews: [],
  },
  alertInfo: {
    open: false,
    alert: {
      type: "success",
      message: "",
    },
  },
};

//Defines store from ininital state
const store = mockStore(initialState);

describe("Testing Alert actions", () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  test("Dispatches correct action in redux store", () => {
    store.dispatch(setAlert({ type: "error", message: "heipadeg" }));

    const actions = store.getActions();
    const expectedPayload = {
      type: "SET_ALERT",
      payload: { type: "error", message: "heipadeg" },
    };
    expect(actions).toEqual([expectedPayload]);
  });

  test("Dispatches correct action in redux store", () => {
    store.dispatch(closeAlert());

    const actions = store.getActions();
    const expectedPayload = {
      type: "CLOSE_ALERT",
    };
    expect(actions).toEqual([expectedPayload]);
  });
});
