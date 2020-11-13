import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { useParams } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../interfaces/RootState";
import { fetchMovie } from "../../redux/movie/movieActions";
import { fetchUser } from "../../redux/user/userActions";
import ReviewContainer from "../ReviewContainer";

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
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchUser: (userID: string) => dispatch(fetchUser(userID)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const UserPage: React.FunctionComponent<Props> = (props) => {
  const { userID } = useParams<{ userID: string }>();
  const myUser = userID === props.userInfo.user.userID;
  const viewingUser = props.userInfo.viewingUser;

  React.useEffect(() => {
    props.fetchUser(userID);
  }, [userID]);

  return (
    <>
      <h1>
        {myUser
          ? "Your user info:"
          : "User info of user " + viewingUser.username + ":"}
      </h1>
      <p>Username: {viewingUser.username}</p>
      <p>User ID: {viewingUser.userID}</p>
      <h2>{myUser ? "Your reviews" : "Reviews of " + viewingUser.username}</h2>
      <ReviewContainer type="user" />
    </>
  );
};

export default connector(UserPage);
