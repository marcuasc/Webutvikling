import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../interfaces/RootState";
import { closeMovieDialog, fetchMovie } from "../../redux/movie/movieActions";
import CustomizedRatings from "../CustomizedRatings";
import "./style.css";

/* 

This first part of the code is all regarding to redux. This is because this component needs to access the redux state.
The following code follows the conventions that redux suggests. You can read more about it here: https://redux.js.org/recipes/usage-with-typescript

The first thing to do is declare an interface (RootState) that fits the redux store. It is only necessary to declare the parts of the store that the component needs.
The function mapStateToProps is responsible for mapping the redux state to the components props. This uses the RootState interface to get the parts that we need from the state.

The function mapDispatchToProps is responsible for mapping the redux actions to the components props. We only map the actions that this component needs and uses.

Then we declare the connector with the connect function with the mapStateToProps and mapDispatchToProps as input.
This is to easily Use the ConnectedProps<T> to infer the types of the props from connect automatically.

Then we declare the type of the final Props that the component will use. We write it like this so that it is easy to add props if the component needs it.

Finally the component takes in props of the type Props.

When the component is exported (at the bottom), the component gets connected to the redux store with the connector we declared.

*/

const mapStateToProps = (state: RootState) => {
  return {
    movieInfo: state.movieInfo,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    closeMovieDialog: () => dispatch(closeMovieDialog()),
    fetchMovie: (id: string) => dispatch(fetchMovie(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

const MovieDialog: React.FunctionComponent<Props> = (props) => {
  // Extracts relevant properties and action from the redux state.
  const movie = props.movieInfo.movie;
  const id = movie._id;
  const fetchMovie = props.fetchMovie;

  // Makes a datestring according to the release date of the movie.
  const dateString = new Date(Date.parse(movie.release_date)).toDateString();

  // useEffect hook triggers everytime id or fetchMovie updates.
  // fetches movie based on current id in redux state.
  React.useEffect(() => {
    if (id !== "") {
      fetchMovie(id);
    }
  }, [id, fetchMovie]);

  return (
    // MUI Dialog component, open set to open property from redux state. When onClose (clicking outside the dialog), runs closeResult action.
    <Dialog
      className="dialog"
      maxWidth="xl"
      color="secondary"
      open={props.movieInfo.open}
      onClose={props.closeMovieDialog}
    >
      {/* title set to the title of the current movie */}
      <DialogTitle>{movie.title}</DialogTitle>
      <DialogContent dividers className="movieInfo">
        <div className="contentContainerLeft">
          {/* Poster of current movie */}
          <img
            className="movieImg"
            src={movie.poster_path}
            alt="This is the poster of the movie"
          />
        </div>
        <div className="contentContainerRight">
          <div>
            <span className="infoTitle">Description: </span>
            <br />
            {/* Description of current movie */}
            <span>{movie.desc}</span>
          </div>
          <div>
            <span className="infoTitle">Duration: </span>
            {/* Duration of current movie. If 0 display N/A */}
            <span>
              {movie.duration === 0 ? "N/A" : movie.duration + " min"}
            </span>
          </div>
          <div>
            <span className="infoTitle">Genre: </span>
            {/* Genre of current movie. If length 0, display N/A */}
            <span>
              {movie.genre.length === 0 ? "N/A" : movie.genre.join(", ")}
            </span>
          </div>
          <div>
            <span className="infoTitle">Release date: </span>
            {/* Release date of current movie. If "Invalid date", display N/A */}
            <span>{dateString === "Invalid Date" ? "N/A" : dateString}</span>
          </div>
          <div>
            <span className="infoTitle">Budget: </span>
            {/* Budget of current movie. If 0, display N/A */}
            <span>{movie.budget === 0 ? "N/A" : movie.budget + " USD"}</span>
          </div>
          <div>
            <span className="infoTitle">Average rating: </span>
            {/* Avarage rating of current movie. Finds the avaragem from the ratings list. */}
            <span>
              {/* {(
                                movie.ratings.reduce((a, b) => a + b, 0) /
                                movie.ratings.length
                            ).toFixed(1) + "/5"} */}
              "WIP"
            </span>
          </div>
          <div>
            <span className="infoTitle">Your rating:</span>
            <CustomizedRatings />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        {/* MUI Button that runs closeMovieDialog action */}
        <Button onClick={props.closeMovieDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connector(MovieDialog);
