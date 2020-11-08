import { Box } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../interfaces/RootState";
import { openMovieDialog } from "../../redux/movie/movieActions";
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
    openMovieDialog: (id: string) => dispatch(openMovieDialog(id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  id: string;
  title: string;
  posterPath: string;
};

const MovieContainer: React.FunctionComponent<Props> = (props) => {
  const history = useHistory();

  return (
    // Returns a Box (MUI) with an image and title according to the props it got from the SearchResults component.
    // When clicked, triggers openMovieDialog action with the current id from redux state.
    <Box
      onClick={() => history.push("movie/" + props.id)}
      className="result"
      bgcolor="secondary.light"
      boxShadow={3}
      color="text.secondary"
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

export default connector(MovieContainer);
