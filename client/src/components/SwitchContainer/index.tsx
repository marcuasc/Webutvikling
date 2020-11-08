import React from "react";
import { Route, Switch } from "react-router-dom";
import SearchContainer from "../SearchContainer";
import "./style.css";

const SwitchContainer: React.FunctionComponent = () => {
  return (
    <div id="switchContainer">
      <Switch>
        <Route path="/test">
          <div>test</div>
        </Route>
        <Route>
          {/* SearchContainer for all search related things */}
          <SearchContainer />
        </Route>
      </Switch>
    </div>
  );
};

export default SwitchContainer;
