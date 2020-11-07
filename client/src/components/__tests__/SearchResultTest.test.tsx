import resultReducer from "../../redux/movie/movieReducer";
import { MovieActionTypes } from "../../redux/movie/movieTypes";

/*Staten open bestemmer om dialogen skal være fremme eller ikkke
 Denne testen sjekker at OPEN_RESULT_MODAL faktisk endrer på staten "open", ved å sjekke previous og expected state
 skal endre "open" fra false til true
 */

test("should return expected state for OPEN_RESULT_MODAL action type and specific state", () => {
  const previousState = {
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
  };
  const action: MovieActionTypes = {
    type: "OPEN_MOVIE_DIALOG",
    payload: "",
  };
  const expectedState = {
    open: true,
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
  };
  expect(resultReducer(previousState, action)).toEqual(expectedState);
});

/* Staten open bestemmer om dialogen skal være synlig eller ikke
 Denne testen sjekker at CLOSE_RESULT_MODAL faktisk endrer på staten "open", ved å sjekke previous og expected state
Skal endre "open" fra true til false
 */

test("should return expected state for CLOSE_RESULT_MODAL action type and specific state", () => {
  const previousState = {
    open: true,
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
  };
  const action: MovieActionTypes = {
    type: "CLOSE_MOVIE_DIALOG",
  };
  const expectedState = {
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
  };
  expect(resultReducer(previousState, action)).toEqual(expectedState);
});
