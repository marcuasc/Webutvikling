import { Filters } from "../redux/filter/filterTypes";
import { Movie } from "../redux/movie/movieTypes";
import { RecievedReview } from "../redux/review/reviewTypes";

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
    };
  };
  reviewInfo: {
    loading: false;
    error: string;
    reviews: Array<RecievedReview>;
  };
}
