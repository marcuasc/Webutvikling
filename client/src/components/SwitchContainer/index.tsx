import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../LoginPage";
import MoviePage from "../MoviePage";
import PageContainer from "../PageContainer";
import SearchBar from "../SearchBar";
import SearchResults from "../SearchResults";
import UserPage from "../UserPage";
import "./style.css";

const SwitchContainer: React.FunctionComponent = () => {
  return (
    <div id="switchContainer">
      <Switch>
        <Route exact path="/">
          <div id="searchContainer">
            <SearchBar />
            <PageContainer />
            <SearchResults />
            <PageContainer />
          </div>
        </Route>
        <Route path="/movie/:movieID">
          <MoviePage />
        </Route>
        <Route path="/user/:userID">
          <LoginPage open={true} />
        </Route>
        <Route>
          <p>404</p>
        </Route>
      </Switch>
    </div>
  );
};

export default SwitchContainer;
