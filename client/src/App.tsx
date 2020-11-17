import React from "react";
import {
  AppBar,
  Box,
  createMuiTheme,
  IconButton,
  makeStyles,
  MuiThemeProvider,
  Toolbar,
} from "@material-ui/core";
import "./App.css";
import { Brightness5, Brightness7 } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import SwitchContainer from "./components/SwitchContainer";
import { RootState } from "./interfaces/RootState";
import { connect, ConnectedProps } from "react-redux";
import CustomSnackbar from "./components/CustomSnackbar";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { resetSearch } from "./redux/search/searchActions";
import { resetFilters } from "./redux/filter/filterActions";

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
    resetSearch: () => dispatch(resetSearch()),
    resetFilters: () => dispatch(resetFilters()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const App: React.FunctionComponent<Props> = (props) => {
  // State to hold the value for darkmade. Set to true by default.
  const [darkMode, setDarkMode] = React.useState(true);

  const primaryColors = {
    main: "#7cec9f",
    light: "#b0ffd0",
    dark: "#47b970",
  };

  // Creates the lightTheme for our website with primary and secondary colors. Part of Material UI.
  const lightTheme = createMuiTheme({
    palette: {
      primary: primaryColors,
      secondary: {
        main: "#e8e8e8",
        light: "#ffffff",
        dark: "#b6b6b6",
      },
      success: primaryColors,
      type: "light",
    },
  });

  // Creates the lightTheme for our website with primary and secondary colors. Part of Material UI.
  const darkTheme = createMuiTheme({
    palette: {
      primary: primaryColors,
      secondary: {
        main: "#212121",
        light: "#484848",
        dark: "#000000",
      },
      success: primaryColors,
      type: "dark",
    },
  });
  // Primary colors are the same in both darkTheme and lightTheme.

  // useMemo recomputes the current theme when one of the dependencies changes.
  // lightTheme and darkTheme never changes.
  // Only when the state darkMode changes, the theme will be recomputed based on that value.
  // If true, use darkmode. Else use lightMode
  const theme = React.useMemo(() => (darkMode ? darkTheme : lightTheme), [
    darkMode,
    darkTheme,
    lightTheme,
  ]);

  // Use makeStyles from MUI to overwrite the styling of MUI components
  // Will only be used on the appBar component, but written for possibility for expansion.
  const useStyles = makeStyles(() => ({
    // Want the appBars bgColor to be the light version of the current theme.
    appBar: { backgroundColor: theme.palette.secondary.light },
  }));

  // Make the classes from useStyles.
  const classes = useStyles();

  // The useHistory hook gives access to the history instance used for navigation.
  const history = useHistory();

  return (
    //  Wraps the entire application in the MUI theme provider so that every component can access the current theme.
    <MuiThemeProvider theme={theme}>
      {/* Box works as a div, but has the possibility to dynamically change bg and text color based on the current theme. Imported from MUI */}
      <Box className="App" bgcolor="secondary.main" color="text.secondary">
        {/* AppBar is imported from MUI. Fixed to the top of the screen. 
                    Makes use of the class "appBar" created with makeStyles. This overwrites the standard bgColor.*/}
        <AppBar position="fixed" className={classes.appBar}>
          {/* AppBar should always be used with the Toolbar component from MUI */}
          <Toolbar>
            {/* the logo of the website */}
            <img
              id="logo"
              src="./resources/images/logo.png"
              alt="logo"
              onClick={() => {
                history.replace("/");
                props.resetSearch();
                props.resetFilters();
              }}
            />
            {/* div that occupies remaining space of the Toolbar
                            This is to space the IconButton to the right side of the toolbar */}
            <div className={"grow"} />
            {/* IconButton from MUI. When clicked, flips the darkMode state.
                            Current icon is based on the darkMode state */}
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness5 /> : <Brightness7 />}
            </IconButton>
            <IconButton
              onClick={() => {
                props.userInfo.loggedIn
                  ? history.push("/user/" + props.userInfo.user.userID)
                  : history.push("/login");
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SwitchContainer />
      </Box>
      <CustomSnackbar />
      <Box
        id="footer"
        bgcolor="secondary.light"
        color="text.secondary"
        boxShadow={3}
      >
        <div id="footerContent">
          <span>Made with love {"<3"}</span>
        </div>
      </Box>
    </MuiThemeProvider>
  );
};

export default connector(App);
