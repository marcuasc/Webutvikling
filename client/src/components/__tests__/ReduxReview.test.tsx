import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import {
  deleteReview,
  fetchReview,
  fetchReviews,
  postReview,
  updateReview,
} from "../../redux/review/reviewActions";
import nock from "nock";
import * as types from "../../redux/review/reviewTypes";
import reviewReducer from "../../redux/review/reviewReducer";

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

describe("Testing Review Actions", () => {
  describe("postReview", () => {
    test("Dispatches correct actions when successful", async () => {
      nock("http://localhost:5000").post("/review/").reply(201, {});

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "POST_REVIEW_REQUEST" },
        { type: "POST_REVIEW_SUCCESS" },
        { type: "FETCH_MOVIE_REQUEST" },
        {
          type: "SET_ALERT",
          payload: { type: "success", message: "Successfully posted review!" },
        },
      ];

      await store
        .dispatch(
          postReview(
            {
              rating: 5,
              movieID: "",
              text: "",
            },
            ""
          ) as any
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test("Dispatches correct actions when unsuccessful", async () => {
      nock("http://localhost:5000").post("/review/").replyWithError({
        message: "Error",
      });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "POST_REVIEW_REQUEST" },
        { type: "POST_REVIEW_FAILURE", error: "Error" },
        {
          type: "SET_ALERT",
          payload: { type: "error", message: "Could not post review" },
        },
      ];

      await store
        .dispatch(
          postReview(
            {
              rating: 5,
              movieID: "",
              text: "",
            },
            ""
          ) as any
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe("updateReview", () => {
    test("Dispatches correct actions when successful", async () => {
      nock("http://localhost:5000")
        .put("/review/1")
        .reply(200, { message: "Review updated" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "UPDATE_REVIEW_REQUEST" },
        { type: "UPDATE_REVIEW_SUCCESS" },
        {
          type: "SET_ALERT",
          payload: { type: "success", message: "Successfully updated review!" },
        },
        { type: "FETCH_REVIEW_REQUEST" },
      ];

      await store
        .dispatch(
          updateReview(
            {
              rating: 5,
              movieID: "",
              text: "",
            },
            "1",
            ""
          ) as any
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test("Dispatches correct actions when unsuccessful", async () => {
      nock("http://localhost:5000")
        .put("/review/1")
        .replyWithError({ message: "Error" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "UPDATE_REVIEW_REQUEST" },
        { type: "UPDATE_REVIEW_FAILURE", error: "Error" },
        {
          type: "SET_ALERT",
          payload: { type: "error", message: "Could not update review" },
        },
      ];

      await store
        .dispatch(
          updateReview(
            {
              rating: 5,
              movieID: "",
              text: "",
            },
            "1",
            ""
          ) as any
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe("deleteReview", () => {
    test("Dispatches correct actions when successful", async () => {
      nock("http://localhost:5000")
        .delete("/review/1")
        .reply(200, { message: "Review 1 deleted" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "DELETE_REVIEW_REQUEST" },
        { type: "DELETE_REVIEW_SUCCESS" },
        {
          type: "SET_ALERT",
          payload: { type: "success", message: "Successfully deleted review!" },
        },
      ];

      await store.dispatch(deleteReview("1", "") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("Dispatches correct actions when unsuccessful", async () => {
      nock("http://localhost:5000")
        .delete("/review/1")
        .replyWithError({ message: "Error" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "DELETE_REVIEW_REQUEST" },
        { type: "DELETE_REVIEW_FAILURE", error: "Error" },
        {
          type: "SET_ALERT",
          payload: { type: "error", message: "Could not delete review" },
        },
      ];

      await store.dispatch(deleteReview("1", "") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("fetchReviews", () => {
    test("Dispatches correct actions when successful", async () => {
      nock("http://localhost:5000")
        .get("/movie/1/reviews/")
        .reply(200, {
          reviews: [
            {
              _id: "1",
              text: "review1",
              rating: 5,
              movieID: "1",
              userID: "1",
              username: "user1",
              movieTitle: "movie1",
            },
            {
              _id: "2",
              text: "review2",
              rating: 5,
              movieID: "1",
              userID: "2",
              username: "user2",
              movieTitle: "movie1",
            },
          ],
        });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "FETCH_REVIEWS_REQUEST" },
        {
          type: "FETCH_REVIEWS_SUCCESS",
          payload: [
            {
              _id: "1",
              movieID: "1",
              movieTitle: "movie1",
              rating: 5,
              text: "review1",
              userID: "1",
              username: "user1",
            },
            {
              _id: "2",
              movieID: "1",
              movieTitle: "movie1",
              rating: 5,
              text: "review2",
              userID: "2",
              username: "user2",
            },
          ],
        },
      ];

      await store.dispatch(fetchReviews("movie", "1") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("Dispatches correct actions when unsuccessful", async () => {
      nock("http://localhost:5000")
        .get("/movie/1/reviews/")
        .replyWithError({ message: "Error" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "FETCH_REVIEWS_REQUEST" },
        { type: "FETCH_REVIEWS_FAILURE", error: "Error" },
        {
          type: "SET_ALERT",
          payload: { type: "error", message: "Could not fetch reviews" },
        },
      ];

      await store.dispatch(fetchReviews("movie", "1") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("fetchReview", () => {
    test("Dispatches correct actions when successful", async () => {
      nock("http://localhost:5000").get("/review/1").reply(200, {
        _id: "1",
        text: "review1",
        rating: 5,
        movieID: "1",
        userID: "1",
        username: "user1",
        movieTitle: "movie1",
      });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "FETCH_REVIEW_REQUEST" },
        {
          type: "FETCH_REVIEW_SUCCESS",
          payload: {
            _id: "1",
            text: "review1",
            rating: 5,
            movieID: "1",
            userID: "1",
            username: "user1",
            movieTitle: "movie1",
          },
        },
      ];

      await store.dispatch(fetchReview("1") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("Dispatches correct actions when unsuccessful", async () => {
      nock("http://localhost:5000")
        .get("/review/1")
        .replyWithError({ message: "Error" });

      //Defines store from ininital state
      const store = mockStore(initialState);

      const expectedActions = [
        { type: "FETCH_REVIEW_REQUEST" },
        { type: "FETCH_REVIEW_FAILURE", error: "Error" },
        {
          type: "SET_ALERT",
          payload: { type: "error", message: "Could not fetch review" },
        },
      ];

      await store.dispatch(fetchReview("1") as any).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("Testing reviewReducer", () => {
  let initialReviewState: types.ReviewInfo = initialState.reviewInfo;
  let endReviewState: types.ReviewInfo = initialState.reviewInfo;
  afterEach(() => {
    initialReviewState = initialState.reviewInfo;
    endReviewState = initialState.reviewInfo;
  });

  test("It returns correct state after POST_REVIEW_REQUEST", () => {
    endReviewState.loading = true;
    expect(
      reviewReducer(initialReviewState, {
        type: types.POST_REVIEW_REQUEST,
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after POST_REVIEW_SUCCESS", () => {
    endReviewState.loading = false;
    endReviewState.error = "";
    expect(
      reviewReducer(initialReviewState, {
        type: types.POST_REVIEW_SUCCESS,
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after POST_REVIEW_FAILURE", () => {
    endReviewState.loading = false;
    endReviewState.error = "error";
    expect(
      reviewReducer(initialReviewState, {
        type: types.POST_REVIEW_FAILURE,
        error: "error",
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after UPDATE_REVIEW_REQUEST", () => {
    endReviewState.loading = true;
    expect(
      reviewReducer(initialReviewState, {
        type: types.UPDATE_REVIEW_REQUEST,
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after UPDATE_REVIEW_SUCCESS", () => {
    endReviewState.loading = false;
    endReviewState.error = "";
    expect(
      reviewReducer(initialReviewState, {
        type: types.UPDATE_REVIEW_SUCCESS,
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after UPDATE_REVIEW_FAILURE", () => {
    endReviewState.loading = false;
    endReviewState.error = "error";
    expect(
      reviewReducer(initialReviewState, {
        type: types.UPDATE_REVIEW_FAILURE,
        error: "error",
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after DELETE_REVIEW_REQUEST", () => {
    endReviewState.loading = true;
    expect(
      reviewReducer(initialReviewState, {
        type: types.DELETE_REVIEW_REQUEST,
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after DELETE_REVIEW_SUCCESS", () => {
    endReviewState.loading = false;
    endReviewState.error = "";
    expect(
      reviewReducer(initialReviewState, {
        type: types.DELETE_REVIEW_SUCCESS,
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after DELETE_REVIEW_FAILURE", () => {
    endReviewState.loading = false;
    endReviewState.error = "error";
    expect(
      reviewReducer(initialReviewState, {
        type: types.DELETE_REVIEW_FAILURE,
        error: "error",
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after FETCH_REVIEWS_REQUEST", () => {
    endReviewState.loading = true;
    expect(
      reviewReducer(initialReviewState, {
        type: types.FETCH_REVIEWS_REQUEST,
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after FETCH_REVIEWS_SUCCESS", () => {
    endReviewState.loading = false;
    endReviewState.error = "";
    endReviewState.reviews.push({
      _id: "1",
      text: "review1",
      rating: 5,
      movieID: "1",
      userID: "1",
      username: "user1",
      movieTitle: "movie1",
    });
    expect(
      reviewReducer(initialReviewState, {
        type: types.FETCH_REVIEWS_SUCCESS,
        payload: [
          {
            _id: "1",
            text: "review1",
            rating: 5,
            movieID: "1",
            userID: "1",
            username: "user1",
            movieTitle: "movie1",
          },
        ],
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after FETCH_REVIEWS_FAILURE", () => {
    endReviewState.loading = false;
    endReviewState.error = "error";
    expect(
      reviewReducer(initialReviewState, {
        type: types.FETCH_REVIEWS_FAILURE,
        error: "error",
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after FETCH_REVIEW_REQUEST", () => {
    endReviewState.loading = true;
    expect(
      reviewReducer(initialReviewState, {
        type: types.FETCH_REVIEW_REQUEST,
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after FETCH_REVIEW_SUCCESS", () => {
    endReviewState.loading = false;
    endReviewState.error = "";
    endReviewState.viewingReview = {
      _id: "1",
      text: "review1",
      rating: 5,
      movieID: "1",
      userID: "1",
      username: "user1",
      movieTitle: "movie1",
    };
    expect(
      reviewReducer(initialReviewState, {
        type: types.FETCH_REVIEW_SUCCESS,
        payload: {
          _id: "1",
          text: "review1",
          rating: 5,
          movieID: "1",
          userID: "1",
          username: "user1",
          movieTitle: "movie1",
        },
      })
    ).toEqual(endReviewState);
  });

  test("It returns correct state after FETCH_REVIEW_FAILURE", () => {
    endReviewState.loading = false;
    endReviewState.error = "error";
    expect(
      reviewReducer(initialReviewState, {
        type: types.FETCH_REVIEW_FAILURE,
        error: "error",
      })
    ).toEqual(endReviewState);
  });
});
