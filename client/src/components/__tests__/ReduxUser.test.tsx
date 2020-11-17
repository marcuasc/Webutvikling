import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import nock from "nock";
import {
  deleteUser,
  fetchUser,
  loginUser,
  registerUser,
} from "../../redux/user/userActions";
import * as types from "../../redux/user/userTypes";
import userReducer from "../../redux/user/userReducer";

// Defines mockstore-function with thunk
const middlewares: any = [thunk];
const mockStore = configureStore(middlewares);

//Defines initial state
let initialState = {
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
    viewingUser: {
      username: "",
      userID: "",
      reviews: [],
    },
  },
  reviewInfo: {
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
  },
  alertInfo: {
    open: false,
    alert: {
      type: "success",
      message: "",
    },
  },
};

describe("Testing User Actions", () => {
  describe("loginUser", () => {
    test("Dispatches correct actions when successful", async () => {
      nock("http://localhost:5000").post("/user/login").reply(200, {
        username: "user1",
        userID: "1",
        token: "",
        expires: 1,
      });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "USER_LOGIN_REQUEST" },
        {
          type: "USER_LOGIN_SUCCESS",
          payload: {
            username: "user1",
            userID: "1",
            token: "",
            expires: 1,
          },
        },
        {
          type: "SET_ALERT",
          payload: { type: "success", message: "Successfully logged in!" },
        },
      ];

      await store.dispatch(loginUser("1", "") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("Dispatches correct actions when unsuccessful", async () => {
      nock("http://localhost:5000")
        .post("/user/login")
        .replyWithError({ message: "Error" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "USER_LOGIN_REQUEST" },
        { type: "USER_LOGIN_FAILURE", payload: "Error" },
        {
          type: "SET_ALERT",
          payload: { type: "error", message: "Wrong username or password" },
        },
      ];

      await store.dispatch(loginUser("1", "") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("registerUser", () => {
    test("Dispatches correct actions when successful", async () => {
      nock("http://localhost:5000").post("/user/register").reply(200, {
        username: "user1",
        userID: "1",
        token: "",
        expires: 1,
      });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "USER_REGISTER_REQUEST" },
        {
          type: "USER_REGISTER_SUCCESS",
          payload: { username: "user1", userID: "1", token: "", expires: 1 },
        },
        {
          type: "SET_ALERT",
          payload: {
            type: "success",
            message: "Successfully registered user!",
          },
        },
      ];

      await store.dispatch(registerUser("1", "") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("Dispatches correct actions when unsuccessful", async () => {
      nock("http://localhost:5000")
        .post("/user/register")
        .replyWithError({ message: "Error" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "USER_REGISTER_REQUEST" },
        { type: "USER_REGISTER_FAILURE", payload: "Error" },
        {
          type: "SET_ALERT",
          payload: {
            type: "error",
            message: "Could not register user. Username might be taken",
          },
        },
      ];

      await store.dispatch(registerUser("1", "") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("fetchUser", () => {
    test("Dispatches correct actions when successful", async () => {
      nock("http://localhost:5000")
        .get("/user/1")
        .reply(200, {
          reviews: ["1"],
          _id: "1",
          username: "user1",
        });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "FETCH_USER_REQUEST" },
        {
          type: "FETCH_USER_SUCCESS",
          payload: { username: "user1", userID: "1", reviews: ["1"] },
        },
        { type: "FETCH_REVIEWS_REQUEST" },
      ];

      await store.dispatch(fetchUser("1") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("Dispatches correct actions when unsuccessful", async () => {
      nock("http://localhost:5000")
        .get("/user/1")
        .replyWithError({ message: "Error" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "FETCH_USER_REQUEST" },
        { type: "FETCH_USER_FAILURE", payload: "Error" },
        {
          type: "SET_ALERT",
          payload: { type: "error", message: "Could not fetch user" },
        },
      ];

      await store.dispatch(fetchUser("1") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("deleteUser", () => {
    test("Dispatches correct actions when successful", async () => {
      nock("http://localhost:5000")
        .delete("/user/1")
        .reply(200, { message: "User 1 deleted" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "DELETE_USER_REQUEST", payload: "1" },
        { type: "DELETE_USER_SUCCESS" },
        { type: "USER_LOGOUT" },
        {
          type: "SET_ALERT",
          payload: { type: "success", message: "User successfully deleted!" },
        },
      ];

      await store.dispatch(deleteUser("1", "") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("Dispatches correct actions when unsuccessful", async () => {
      nock("http://localhost:5000")
        .delete("/user/1")
        .replyWithError({ message: "Error" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "DELETE_USER_REQUEST", payload: "1" },
        { type: "DELETE_USER_FAILURE", payload: "Error" },
        {
          type: "SET_ALERT",
          payload: { type: "error", message: "Could not delete user" },
        },
      ];

      await store.dispatch(deleteUser("1", "") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("Testing userReducer", () => {
  let initialUserState: types.UserInfo = initialState.userInfo;
  let endUserState: types.UserInfo = initialState.userInfo;
  afterEach(() => {
    initialUserState = initialState.userInfo;
    endUserState = initialState.userInfo;
  });

  test("It returns correct state after USER_LOGIN_REQUEST", () => {
    endUserState.loading = true;
    expect(
      userReducer(initialUserState, {
        type: types.USER_LOGIN_REQUEST,
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after USER_LOGIN_SUCCESS", () => {
    endUserState.loading = false;
    endUserState.loggedIn = true;
    endUserState.error = "";
    endUserState.user = {
      username: "user1",
      userID: "1",
      token: "",
      expires: 1,
    };
    expect(
      userReducer(initialUserState, {
        type: types.USER_LOGIN_SUCCESS,
        payload: { username: "user1", userID: "1", token: "", expires: 1 },
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after USER_LOGIN_FAILURE", () => {
    endUserState.loading = false;
    endUserState.loggedIn = false;
    endUserState.error = "Error";
    endUserState.user = {
      username: "",
      userID: "",
      token: "",
      expires: 0,
    };
    expect(
      userReducer(initialUserState, {
        type: types.USER_LOGIN_FAILURE,
        payload: "Error",
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after USER_REGISTER_REQUEST", () => {
    endUserState.loading = true;
    expect(
      userReducer(initialUserState, {
        type: types.USER_REGISTER_REQUEST,
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after USER_REGISTER_SUCCESS", () => {
    endUserState.loading = false;
    endUserState.loggedIn = true;
    endUserState.error = "";
    endUserState.user = {
      username: "user1",
      userID: "1",
      token: "",
      expires: 1,
    };
    expect(
      userReducer(initialUserState, {
        type: types.USER_REGISTER_SUCCESS,
        payload: { username: "user1", userID: "1", token: "", expires: 1 },
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after USER_REGISTER_FAILURE", () => {
    endUserState.loading = false;
    endUserState.loggedIn = false;
    endUserState.error = "Error";
    endUserState.user = {
      username: "",
      userID: "",
      token: "",
      expires: 0,
    };
    expect(
      userReducer(initialUserState, {
        type: types.USER_REGISTER_FAILURE,
        payload: "Error",
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after FETCH_USER_REQUEST", () => {
    expect(
      userReducer(initialUserState, {
        type: types.FETCH_USER_REQUEST,
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after FETCH_USER_SUCCESS", () => {
    endUserState.viewingUser = {
      username: "user1",
      userID: "1",
      reviews: ["1"],
    };
    expect(
      userReducer(initialUserState, {
        type: types.FETCH_USER_SUCCESS,
        payload: {
          username: "user1",
          userID: "1",
          reviews: ["1"],
        },
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after FETCH_USER_FAILURE", () => {
    expect(
      userReducer(initialUserState, {
        type: types.FETCH_USER_FAILURE,
        payload: "Error",
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after DELETE_USER_REQUEST", () => {
    endUserState.loading = true;
    expect(
      userReducer(initialUserState, {
        type: types.DELETE_USER_REQUEST,
        payload: "1",
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after DELETE_USER_SUCCESS", () => {
    endUserState.loading = false;
    endUserState.error = "";
    expect(
      userReducer(initialUserState, {
        type: types.DELETE_USER_SUCCESS,
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after DELETE_USER_FAILURE", () => {
    endUserState.loading = false;
    endUserState.error = "Error";
    expect(
      userReducer(initialUserState, {
        type: types.DELETE_USER_FAILURE,
        payload: "Error",
      })
    ).toEqual(endUserState);
  });

  test("It returns correct state after USER_LOGOUT", () => {
    endUserState = {
      ...endUserState,
      loggedIn: false,
      loading: false,
      error: "",
      user: {
        username: "",
        userID: "",
        token: "",
        expires: 0,
      },
    };
    expect(
      userReducer(initialUserState, {
        type: types.USER_LOGOUT,
      })
    ).toEqual(endUserState);
  });
});
