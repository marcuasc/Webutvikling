import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";
import { RootState } from "../../interfaces/RootState";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../../redux/user/userActions";

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
    loginUser: (username: string, password: string) =>
      dispatch(loginUser(username, password)),
    registerUser: (username: string, password: string) =>
      dispatch(registerUser(username, password)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

// Takes in prop "type" from parent. Determines if the Container is supposed to login or register user
type Props = PropsFromRedux & {
  type: "login" | "register";
};

// Function for returning a fancy copyright declaration.
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">AMDb</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Use makeStyles from MUI to overwrite the styling of MUI components
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "20px",
    padding: "10px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "80%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginRegisterContainer: React.FunctionComponent<Props> = (props) => {
  // The useHistory hook gives access to the history instance used for navigation.
  const history = useHistory();

  // Make the classes from useStyles.
  const classes = useStyles();

  // Gets relevant state from props.
  const type = props.type;
  const userInfo = props.userInfo;

  // Creates username and password in the component state.
  // Used for storing the current input in username and password textfields and for submitting.
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Function that runs when submit button is pressed.
  // Varies based on the type prop.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (type === "login") {
      props.loginUser(username, password);
    } else {
      props.registerUser(username, password);
    }
  };

  // Function that runs when the link/register link is clicked.
  // Varies based on the type prop.
  const handleLinkClick = () => {
    type === "login" ? history.replace("/register") : history.replace("/login");
  };

  // The React.useEffect() hook runs whenever the component mounts or one of the dependencies in the dependency list changes.
  // If the user is logged in and the user is not set in localstorage, set the user in localstorage
  React.useEffect(() => {
    if (userInfo.loggedIn && localStorage.getItem("currentUser") === null) {
      localStorage.setItem("currentUser", JSON.stringify(userInfo.user));
    }
  }, [userInfo.loggedIn, userInfo.user]);

  // The React.useEffect() hook runs whenever the component mounts or one of the dependencies in the dependency list changes.
  // If the user is logged in, redirect to the users page.
  React.useEffect(() => {
    if (userInfo.loggedIn) {
      history.replace("/user/" + userInfo.user.userID);
    }
  }, [userInfo.loggedIn, userInfo.user.userID, history]);

  return (
    // MUI, grid for responsive design
    <Grid
      item
      xs={12}
      sm={8}
      md={5}
      component={Paper}
      elevation={6}
      id="paperContainer"
    >
      <div className={classes.paper}>
        {/* Avatar icon */}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {/* Title based on type prop */}
        <Typography component="h1" variant="h5">
          {type === "login" ? "Sign in" : "Register"}
        </Typography>
        {/* Form for login info. Runs handle submit when submitted */}
        <form
          className={classes.form}
          onSubmit={(event) => handleSubmit(event)}
        >
          {/* Textfield for username. Value based on state. Updates state with new value when changed. */}
          <TextField
            data-testid="username1"
            inputProps={{ "data-testid": "username_input" }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {/* Textfield for password. Value based on state. Updates state with new value when changed. */}
          <TextField
            data-testid="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* Submit button. Makes the form run onSubmit. Text based on type prop */}
          <Button
            data-testid="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {type === "login" ? "Sign in" : "Register"}
          </Button>
          <Grid container>
            <Grid item>
              {/* Link from MUI. Runs handleLinkClick when clicked. Text depends on type prop */}
              <Link onClick={handleLinkClick} variant="body2">
                {type === "login"
                  ? "Don't have an account? Register"
                  : "Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
          {/* Inserts Copyright declaration */}
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    </Grid>
  );
};

export default connector(LoginRegisterContainer);
