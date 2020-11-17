import { Box, IconButton, Link } from "@material-ui/core";
import { OpenInNew } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../interfaces/RootState";
import { fetchReviews } from "../../redux/review/reviewActions";
import { RecievedReview } from "../../redux/review/reviewTypes";
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
    fetchReviews: (type: "movie" | "user", id: string) =>
      dispatch(fetchReviews(type, id)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

// Takes type as prop from parent
type Props = PropsFromRedux & {
  type: "movie" | "user";
};

const ReviewContainer: React.FunctionComponent<Props> = (props) => {
  // The useHistory hook gives access to the history instance used for navigation.
  const history = useHistory();

  // Extracts relevant state and functions from redux props
  const type = props.type;
  const userInfo = props.userInfo;
  const reviews: Array<RecievedReview> = props.reviewInfo.reviews;

  // Sets a list of React Elements in the state of the component.
  // Is used for containing all reviewBoxes
  const [reviewBoxes, setReviewBoxes] = React.useState<React.ReactElement[]>(
    []
  );

  // Function for updating the component reviewBoxes state with the relevant reviews
  const updateReviewElements = React.useCallback(() => {
    const newReviews: React.ReactElement[] = [];
    // Iterates over all the reviews in the state
    for (const review of reviews) {
      // Only creates a reviewBox when the review is not written by the current user and the type prop is movie
      if (!(type === "movie" && review.userID === userInfo.user.userID)) {
        // Pushes to newReviews list.
        newReviews.push(
          <Box key={review._id} className="review" bgcolor="secondary.light">
            <div className="reviewContent">
              <div className="reviewTop">
                <h3 className="noMargin">
                  {/* Title depends on type prop */}
                  {type === "movie" ? (
                    <Link href={"/user/" + review.userID}>
                      {review.username}
                    </Link>
                  ) : (
                    <Link href={"/movie/" + review.movieID}>
                      {review.movieTitle}
                    </Link>
                  )}
                </h3>
                {/* When clicked opens the corrosponding review */}
                <IconButton
                  onClick={() => history.replace("/review/" + review._id)}
                  size="small"
                >
                  <OpenInNew />
                </IconButton>
              </div>
              {/* Rating component from MUI. Cannot be changed */}
              <Rating value={review.rating} readOnly />
              {/* Inserts review text */}
              <span>{review.text}</span>
            </div>
          </Box>
        );
      }
    }
    // Sets the state with the updated reviewBoxes.
    setReviewBoxes(newReviews);
  }, [type, history, reviews, userInfo.user.userID]);

  // The React.useEffect() hook runs whenever the component mounts or one of the dependencies in the dependency list changes
  // When reviews changes, run updateReviewElements
  React.useEffect(() => {
    updateReviewElements();
  }, [reviews, updateReviewElements]);

  return (
    <div id="reviewContainer">
      {/* If there are no reviews, display fitting response. Else display reviewBoxes from state */}
      {reviewBoxes.length > 0 ? reviewBoxes : <p>There are no reviews yet</p>}
    </div>
  );
};

export default connector(ReviewContainer);
