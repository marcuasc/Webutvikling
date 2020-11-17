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
  const history = useHistory();
  const viewingReview = props.reviewInfo.viewingReview;
  const classes = useStyles();
  const fetchReview = props.fetchReview;
  const { reviewID } = useParams<{ reviewID: string }>();
  const userIsWriter = viewingReview.userID === props.userInfo.user.userID;
  const [editing, setEditing] = React.useState(false);

  const [rating, setRating] = React.useState(viewingReview.rating);
  const [text, setText] = React.useState(viewingReview.text);

  const updateReview = props.updateReview;
  const deleteReview = props.deleteReview;

  React.useEffect(() => {
    setRating(viewingReview.rating);
  }, [viewingReview.rating]);

  React.useEffect(() => {
    fetchReview(reviewID);
  }, [reviewID]);

  return (
    <>
      <BackButton />
      <div id="reviewPage">
        {props.reviewInfo.loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1>
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
            <Rating
              name="rating"
              readOnly={!editing}
              value={rating}
              onChange={(_, value) => {
                setRating(value === null ? 1 : value);
              }}
            />
            {editing ? (
              <TextField
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
            ) : (
              <p>{viewingReview.text}</p>
            )}
            <div
              id="reviewButtons"
              className={userIsWriter ? "showing" : "hiding"}
            >
              <div className={editing ? "showing" : "hiding"}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Check />}
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
              <Button
                className={classes.warningButton}
                variant="contained"
                onClick={() => {
                  setEditing(!editing);
                  setRating(viewingReview.rating);
                  setText(viewingReview.text);
                }}
                startIcon={editing ? <Close /> : <Edit />}
              >
                {editing ? "Cancel" : "Edit"}
              </Button>
              <Button
                variant="contained"
                className={classes.errorButton}
                startIcon={<Delete />}
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
