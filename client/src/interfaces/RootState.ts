import { Filters } from "../redux/filter/filterTypes";
import { Movie } from "../redux/movie/movieTypes";

export interface RootState {
  movieInfo: {
    open: boolean;
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
}
