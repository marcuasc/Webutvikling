import {
  Box,
  Button,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { OpenInNew } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../interfaces/RootState";
import { postReview } from "../../redux/review/reviewActions";
import { Review } from "../../redux/review/reviewTypes";
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
    reviewInfo: state.reviewInfo,
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    postReview: (review: Review, token: string) =>
      dispatch(postReview(review, token)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const UserReview: React.FunctionComponent<Props> = (props) => {
  // The useHistory hook gives access to the history instance used for navigation.
  const history = useHistory();

  // Sets rating and text in the component state
  const [rating, setRating] = React.useState(1);
  const [text, setText] = React.useState("");

  // Extracts relevant state from redux props
  const loggedIn = props.userInfo.loggedIn;

  // Finds the review of the user that is logged in, if it exists.
  const userReview = props.reviewInfo.reviews.find(
    (review) => review.userID === props.userInfo.user.userID
  );

  // function that runs when submit button is pressed. Dispatches the postReview action with the review object and token.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.postReview(
      {
        rating: rating,
        text: text,
        movieID: props.movieInfo.movie._id,
      },
      props.userInfo.user.token
    );
  };

  return (
    <>
      <h2>Your review</h2>
      <Box className="review" bgcolor="secondary.light">
        <div className="reviewContent">
          {/* If the user is logged in ... */}
          {loggedIn ? (
            // ... and has not written a review
            userReview === undefined ? (
              <>
                {/* Display a form for submitting review */}
                <h3>Write your review</h3>
                {/* On submit, run handleSubmit function */}
                <form onSubmit={(event) => handleSubmit(event)} id="reviewForm">
                  {/* Rating component from MUI. Value dependent on state, updates state with new value when changed. Cannot be null */}
                  <Rating
                    name="rating"
                    aria-required="true"
                    value={rating}
                    onChange={(_, value) => {
                      setRating(value === null ? 1 : value);
                    }}
                  ></Rating>
                  {/* TextField component from MUI. Value dependent on state, updates state with new value when changed. Cannot be blank */}
                  <TextField
                    multiline
                    variant="filled"
                    label="Your review"
                    name="text"
                    required
                    value={text}
                    onChange={(event) => {
                      setText(event.target.value);
                    }}
                  />
                  {/* Submit button */}
                  <Button variant="contained" color="primary" type="submit">
                    Post review
                  </Button>
                </form>
              </>
            ) : (
              // ... and has written a review
              <>
                {/* Display the users review */}
                <div className="reviewTop">
                  <h3 className="noMargin">{userReview.username}</h3>
                  {/* When clicked, redirects to review */}
                  <IconButton
                    onClick={() => history.replace("/review/" + userReview._id)}
                    size="small"
                  >
                    <OpenInNew />
                  </IconButton>
                </div>
                {/* Displays the rating and text of the review */}
                <Rating value={userReview.rating} readOnly />
                <span>{userReview.text}</span>
              </>
            )
          ) : (
            // If the user is not logged in, encourage user to log in
            <Typography>
              <Link href="/login">Login</Link>
              <span> to write a review</span>
            </Typography>
          )}
        </div>
      </Box>
    </>
  );
};

export default connector(UserReview);
