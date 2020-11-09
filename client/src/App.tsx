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
import { Provider } from "react-redux";
import store from "./redux/store";
import { Brightness5, Brightness7 } from "@material-ui/icons";
import { BrowserRouter as Router } from "react-router-dom";
import SwitchContainer from "./components/SwitchContainer";

function App() {
  // State to hold the value for darkmade. Set to true by default.
  const [darkMode, setDarkMode] = React.useState(true);

  // Creates the lightTheme for our website with primary and secondary colors. Part of Material UI.
  const lightTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#7cec9f",
        light: "#b0ffd0",
        dark: "#47b970",
      },
      secondary: {
        main: "#e8e8e8",
        light: "#ffffff",
        dark: "#b6b6b6",
      },
      type: "light",
    },
  });

  // Creates the lightTheme for our website with primary and secondary colors. Part of Material UI.
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#7cec9f",
        light: "#b0ffd0",
        dark: "#47b970",
      },
      secondary: {
        main: "#212121",
        light: "#484848",
        dark: "#000000",
      },
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

  return (
    // Wraps the entire application in the react-redux provider so that every component can access the store.
    // Provider is initialized with the redux store from the redux folder.
    <Provider store={store}>
      {/*  Wraps the entire application in the MUI theme provider so that every component can access the current theme. */}
      <MuiThemeProvider theme={theme}>
        <Router>
          {/* Box works as a div, but has the possibility to dynamically change bg and text color based on the current theme. Imported from MUI */}
          <Box className="App" bgcolor="secondary.main" color="text.secondary">
            {/* AppBar is imported from MUI. Fixed to the top of the screen. 
                    Makes use of the class "appBar" created with makeStyles. This overwrites the standard bgColor.*/}
            <AppBar position="fixed" className={classes.appBar}>
              {/* AppBar should always be used with the Toolbar component from MUI */}
              <Toolbar>
                {/* the logo of the website */}
                <img id="logo" src="./resources/images/logo.png" alt="logo" />
                {/* div that occupies remaining space of the Toolbar
                            This is to space the IconButton to the right side of the toolbar */}
                <div className={"grow"} />
                {/* IconButton from MUI. When clicked, flips the darkMode state.
                            Current icon is based on the darkMode state */}
                <IconButton onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <Brightness5 /> : <Brightness7 />}
                </IconButton>
              </Toolbar>
            </AppBar>
            <SwitchContainer />
          </Box>
          <Box id="footer" bgcolor="secondary.light" color="text.secondary">
            <div id="footerContent">
              <span>Made with love {"<3"}</span>
            </div>
          </Box>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
