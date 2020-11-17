import {
  Button,
  Divider,
  Link,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Check, Close, Delete, Edit } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../interfaces/RootState";
import {
  deleteReview,
  fetchReview,
  updateReview,
} from "../../redux/review/reviewActions";
import { Review } from "../../redux/review/reviewTypes";
import BackButton from "../BackButton";
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
    reviewInfo: state.reviewInfo,
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchReview: (id: string) => dispatch(fetchReview(id)),
    deleteReview: (id: string, token: string) =>
      dispatch(deleteReview(id, token)),
    updateReview: (review: Review, id: string, token: string) =>
      dispatch(updateReview(review, id, token)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

// Use makeStyles from MUI to overwrite the styling of MUI components
const useStyles = makeStyles((theme) => ({
  warningButton: {
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  errorButton: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const ReviewPage: React.FunctionComponent<Props> = (props) => {
  // The useHistory hook gives access to the history instance used for navigation.
  const history = useHistory();

  // Make the classes from useStyles.
  const classes = useStyles();

  // Extracts relevant state and functions from redux props
  const viewingReview = props.reviewInfo.viewingReview;
  const fetchReview = props.fetchReview;
  const updateReview = props.updateReview;
  const deleteReview = props.deleteReview;

  // The useParams() hook returns an object of key/value pairs of URL parameters.
  const { reviewID } = useParams<{ reviewID: string }>();

  // Declares a boolean depending on if the user is the writer of the displayed review
  const userIsWriter = viewingReview.userID === props.userInfo.user.userID;

  // Sets editing, rating, and text in the component state.
  const [editing, setEditing] = React.useState(false);
  const [rating, setRating] = React.useState(viewingReview.rating);
  const [text, setText] = React.useState(viewingReview.text);

  // The React.useEffect() hook runs whenever the component mounts or one of the dependencies in the dependency list changes
  // When the rating in the redux state changes, update the component rate state to the rating from redux.
  // Had to to this because of some problems with the Rating component
  React.useEffect(() => {
    setRating(viewingReview.rating);
  }, [viewingReview.rating]);

  // The React.useEffect() hook runs whenever the component mounts or one of the dependencies in the dependency list changes
  // When the reviewID from the url changes, fetch the relevant review to redux.
  React.useEffect(() => {
    fetchReview(reviewID);
  }, [reviewID, fetchReview]);

  return (
    <>
      <BackButton />
      <div id="reviewPage">
        {props.reviewInfo.loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1>
              {/* Title depends on the writer of the review and movie title */}
              <Link href={"/user/" + viewingReview.userID}>
                {viewingReview.username}
              </Link>
              's review of "
              <Link href={"/movie/" + viewingReview.movieID}>
                {viewingReview.movieTitle}
              </Link>
              "
            </h1>
            <Divider />
            {/* Rating component from MUI. When changed update the state to the correct value. Can only be edited if the user is in editing state */}
            <Rating
              name="rating"
              readOnly={!editing}
              value={rating}
              // Rating is set to 1 if it is set to null.
              onChange={(_, value) => {
                setRating(value === null ? 1 : value);
              }}
            />
            {/* If user is editing, display textfield. Else display the text of the review from redux state */}
            {editing ? (
              <TextField
                value={text}
                // When changed, update the state of the component
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
            ) : (
              <p>{viewingReview.text}</p>
            )}
            {/* These buttons only show if the user is the writer of the review. */}
            <div
              id="reviewButtons"
              className={userIsWriter ? "showing" : "hiding"}
            >
              {/* This button only shows if the user is editing */}
              <div className={editing ? "showing" : "hiding"}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Check />}
                  // When clicked, if text is blank alert user. Else dispatch updateReview action from redux with a valid review and the token of the user. Then turns of editing.
                  onClick={() => {
                    if (text === "") {
                      window.alert("You must write something in your review");
                    } else {
                      updateReview(
                        {
                          rating: rating,
                          text: text,
                          movieID: viewingReview.movieID,
                        },
                        viewingReview._id,
                        props.userInfo.user.token
                      );
                      setEditing(false);
                    }
                  }}
                >
                  Update
                </Button>
              </div>
              {/* Button used for flipping the editing state */}
              <Button
                className={classes.warningButton}
                variant="contained"
                // When clicked, flips editing state and resets text and rating.
                onClick={() => {
                  setEditing(!editing);
                  setRating(viewingReview.rating);
                  setText(viewingReview.text);
                }}
                // Text and icon depends on if the user is editing or not.
                startIcon={editing ? <Close /> : <Edit />}
              >
                {editing ? "Cancel" : "Edit"}
              </Button>
              <Button
                variant="contained"
                className={classes.errorButton}
                startIcon={<Delete />}
                // When delete button is clicked, if the user confirms, dispatches deleteReview action with id and token. Redirects to homepage.
                onClick={() => {
                  if (window.confirm("Do you want to delete this review?")) {
                    deleteReview(viewingReview._id, props.userInfo.user.token);
                    history.replace("/");
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default connector(ReviewPage);
