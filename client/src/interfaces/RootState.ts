import { Filters } from "../redux/filter/filterTypes";
import { Movie } from "../redux/movie/movieTypes";
import { RecievedReview } from "../redux/review/reviewTypes";

// Interface for describing the values available from redux
export interface RootState {
  movieInfo: {
    loading: boolean;
    error: string;
    movie: Movie;
  };
  search: {
    loading: Boolean;
    results: Array<any>;
    error: string;
    query: string;
    totalPages: number;
    currentPage: number;
  };
  filter: {
    open: boolean;
    filters: Filters;
  };
  sort: { type: "title" | "duration" | "budget"; descending: boolean };
  userInfo: {
    loggedIn: boolean;
    loading: boolean;
    error: string;
    user: {
      username: string;
      userID: string;
      token: string;
      expires: number;
    };
    viewingUser: {
      username: string;
      userID: string;
      reviews: Array<string>;
    };
  };
  reviewInfo: {
    loading: false;
    error: string;
    reviews: Array<RecievedReview>;
    viewingReview: RecievedReview;
  };
  alertInfo: {
    open: boolean;
    alert: {
      type: "error" | "warning" | "info" | "success";
      message: string;
    };
  };
}
