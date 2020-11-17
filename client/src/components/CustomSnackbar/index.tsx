import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../interfaces/RootState";
import { closeAlert } from "../../redux/alert/alertActions";

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
    alertInfo: state.alertInfo,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    closeAlert: () => dispatch(closeAlert()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const CustomSnackbar: React.FunctionComponent<Props> = (props) => {
  return (
    // The snackbar is located at the bottom to the right.
    <Snackbar
      // redux state determines if the snacbar is open.
      open={props.alertInfo.open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      // It runs the onClose automatically after 5000 ms
      autoHideDuration={5000}
      // onClose runs the closeAlert action from redux
      onClose={() => {
        props.closeAlert();
      }}
    >
      <Alert
        variant="filled"
        // onClose runs the closeAlert action from redux
        onClose={() => {
          props.closeAlert();
        }}
        // Gets severity and message from redux props
        severity={props.alertInfo.alert.type}
      >
        {props.alertInfo.alert.message}
      </Alert>
    </Snackbar>
  );
};

export default connector(CustomSnackbar);
