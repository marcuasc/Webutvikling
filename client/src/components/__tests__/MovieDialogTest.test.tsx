import MovieDialog from "../MovieDialog/index";
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/rootReducer";
import { openMovieDialog } from "../../redux/movie/movieActions";
import thunk from "redux-thunk";

/*  Lager en ny store med thunk middleware 
    Dispatcher en action som vi ønsker å teste
    */
const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(openMovieDialog("heijegerid"));

// Tester at de finnes et element med alt="This is the poster of the movie" i Moviemodal etter det er renderet
test("renders Search-button", () => {
  const { getAllByAltText } = render(
    <Provider store={store}>
      <MovieDialog />
    </Provider>
  );
  const description = getAllByAltText("This is the poster of the movie");
  expect(description[0]).toBeInTheDocument();
});
