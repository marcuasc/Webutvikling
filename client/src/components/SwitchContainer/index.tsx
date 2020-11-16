import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginRegisterContainer from "../LoginRegisterContainer";
import MoviePage from "../MoviePage";
import PageContainer from "../PageContainer";
import ReviewPage from "../ReviewPage";
import SearchBar from "../SearchBar";
import SearchResults from "../SearchResults";
import UserPage from "../UserPage";
import "./style.css";

const SwitchContainer: React.FunctionComponent = () => {
  const history = useHistory();

  React.useEffect(() => {}, []);

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
          <UserPage />
        </Route>
        <Route path="/review/:reviewID">
          <ReviewPage />
        </Route>
        <Route path="/login">
          <LoginRegisterContainer type="login" />
        </Route>
        <Route path="/register">
          <LoginRegisterContainer type="register" />
        </Route>
        <Route>
          <p>404</p>
        </Route>
      </Switch>
    </div>
  );
};

export default SwitchContainer;
