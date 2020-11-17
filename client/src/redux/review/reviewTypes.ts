/*

This file creates the necessary types for Review actions. 
It also creates interfaces for the different actions and combines them to a single ActionTypes type which is exported .

Also creates an interface for Review state.

*/

export const POST_REVIEW_REQUEST = "POST_REVIEW_REQUEST";
export const POST_REVIEW_SUCCESS = "POST_REVIEW_SUCCESS";
export const POST_REVIEW_FAILURE = "POST_REVIEW_FAILURE";

export const UPDATE_REVIEW_REQUEST = "UPDATE_REVIEW_REQUEST";
export const UPDATE_REVIEW_SUCCESS = "UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_FAILURE = "UPDATE_REVIEW_FAILURE";

export const DELETE_REVIEW_REQUEST = "DELETE_REVIEW_REQUEST";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";

export const FETCH_REVIEWS_REQUEST = "FETCH_REVIEWS_REQUEST";
export const FETCH_REVIEWS_SUCCESS = "FETCH_REVIEWS_SUCCESS";
export const FETCH_REVIEWS_FAILURE = "FETCH_REVIEWS_FAILURE";

export const FETCH_REVIEW_REQUEST = "FETCH_REVIEW_REQUEST";
export const FETCH_REVIEW_SUCCESS = "FETCH_REVIEW_SUCCESS";
export const FETCH_REVIEW_FAILURE = "FETCH_REVIEW_FAILURE";

export interface ReviewInfo {
  loading: boolean;
  error: string;
  reviews: Array<RecievedReview>;
  viewingReview: RecievedReview;
}

export interface RecievedReview {
  _id: string;
  rating: number;
  text: string;
  movieID: string;
  userID: string;
  username: string;
  movieTitle: string;
}

export interface Review {
  rating: number;
  text: string;
  movieID: string;
}

interface PostReviewRequestAction {
  type: typeof POST_REVIEW_REQUEST;
}

interface PostReviewSuccessAction {
  type: typeof POST_REVIEW_SUCCESS;
}

interface PostReviewFailureAction {
  type: typeof POST_REVIEW_FAILURE;
  error: string;
}

interface UpdateReviewRequestAction {
  type: typeof UPDATE_REVIEW_REQUEST;
}

interface UpdateReviewSuccessAction {
  type: typeof UPDATE_REVIEW_SUCCESS;
}

interface UpdateReviewFailureAction {
  type: typeof UPDATE_REVIEW_FAILURE;
  error: string;
}

interface DeleteReviewRequestAction {
  type: typeof DELETE_REVIEW_REQUEST;
}

interface DeleteReviewSuccessAction {
  type: typeof DELETE_REVIEW_SUCCESS;
}

interface DeleteReviewFailureAction {
  type: typeof DELETE_REVIEW_FAILURE;
  error: string;
}

interface FetchReviewsRequestAction {
  type: typeof FETCH_REVIEWS_REQUEST;
}

interface FetchReviewsSuccessAction {
  type: typeof FETCH_REVIEWS_SUCCESS;
  payload: Array<RecievedReview>;
}

interface FetchReviewsFailureAction {
  type: typeof FETCH_REVIEWS_FAILURE;
  error: string;
}

interface FetchReviewRequestAction {
  type: typeof FETCH_REVIEW_REQUEST;
}

interface FetchReviewSuccessAction {
  type: typeof FETCH_REVIEW_SUCCESS;
  payload: RecievedReview;
}

interface FetchReviewFailureAction {
  type: typeof FETCH_REVIEW_FAILURE;
  error: string;
}

export type ReviewActionTypes =
  | PostReviewRequestAction
  | PostReviewSuccessAction
  | PostReviewFailureAction
  | UpdateReviewRequestAction
  | UpdateReviewSuccessAction
  | UpdateReviewFailureAction
  | DeleteReviewRequestAction
  | DeleteReviewSuccessAction
  | DeleteReviewFailureAction
  | FetchReviewsRequestAction
  | FetchReviewsSuccessAction
  | FetchReviewsFailureAction
  | FetchReviewRequestAction
  | FetchReviewSuccessAction
  | FetchReviewFailureAction;
