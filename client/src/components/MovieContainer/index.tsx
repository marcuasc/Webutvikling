import { Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

// Takes in id, title and posterPath as props from parent.
type Props = {
  id: string;
  title: string;
  posterPath: string;
};

const MovieContainer: React.FunctionComponent<Props> = (props) => {
  // The useHistory hook gives access to the history instance used for navigation.
  const history = useHistory();

  return (
    // Returns a Box (MUI) with an image and title according to the props it got from the SearchResults component.
    // When clicked, triggers openMovieDialog action with the current id from redux state.
    <Box
      // Changes the history when clicked
      onClick={() => history.push("movie/" + props.id)}
      className="result"
      bgcolor="secondary.light"
      boxShadow={3}
      color="text.secondary"
      data-testid="boxen"
    >
      <img
        className="resultImg"
        src={props.posterPath}
        alt={props.title + " poster"}
      />
      <p className="title">{props.title}</p>
    </Box>
  );
};

export default MovieContainer;
