import React from "react";
import { Button, TextField } from "@material-ui/core";
import "./style.css";
import { updateSearchQuery } from "../../redux/search/searchActions";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { connect, ConnectedProps } from "react-redux";
import FilterDialog from "../FilterDialog";
import { openFilterDialog } from "../../redux/filter/filterActions";
import SortSelect from "../SortSelect";
import { RootState } from "../../interfaces/RootState";

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
    searchData: state.search,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    updateSearchQuery: (query: string) => dispatch(updateSearchQuery(query)),
    openFilterDialog: () => dispatch(openFilterDialog()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const SearchBar: React.FunctionComponent<Props> = (props) => {
  // Sets a timer in the state of the component. Initially set to do nothing after 0 seconds.
  // This is going to trigger a search when the user stops typing in the searchbar.
  const [timer, setTimer] = React.useState(setTimeout(() => {}, 0));

  // Sets a value in the state of the component. Initially set to an empty string.
  // This is the current value of the text field in the searchbar
  const [value, setValue] = React.useState(props.searchData.query);

  // Extracts the redux action updateSearchQuery from the props of the component.
  const updateSearchQuery = props.updateSearchQuery;

  // This function triggers every time the textfield is updated.
  // It clears the current timer, so that the function it was set to perform after an amount of time gets cancelled.
  // Then it updates the state value with the new value in the textfield.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    setValue(event.target.value);
  };

  // This function triggers when the user presses a key on their keyboard while the textfield is selected.
  // Only does something when that key is "Enter".
  // It clears the current timer, so that the function it was set to perform after an amount of time gets cancelled.
  // The it calls the function triggerChange.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      clearTimeout(timer);
      triggerChange();
    }
  };

  // This function triggers when the search button is clicked.
  // It clears the current timer, so that the function it was set to perform after an amount of time gets cancelled.
  // The it calls the function triggerChange
  const handleClick = () => {
    clearTimeout(timer);
    triggerChange();
  };

  // This function takes the current value in the state and calls the updateSearchQuery function with it as input.
  // Because of the useCallback hook, this function only updates what it does when a dependency from the dependency list updates and not every time the component updates.
  const triggerChange = React.useCallback(() => {
    const query = value;
    updateSearchQuery(query);
  }, [value, updateSearchQuery]);

  // From the react.js docs: "useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component."
  // Found it easier and cleaner to do this than having it in the state.
  // Is to be used to not set a timer when the component first mounts.
  const firstUpdate = React.useRef(true);

  // useEffect hook triggers when the component has mounted and when any of the dependencies from the dependency list updates
  // Does nothing on the first mount.
  // When the value changes, sets a timer to trigger triggerChange after 1 sec.
  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setTimer(setTimeout(triggerChange, 1000));
  }, [value, triggerChange]);

  return (
    <div id="searchBar">
      <div id="sortSelect">
        <SortSelect />
      </div>
      <div id="textField">
        {/* TextField component from MUI. value is set to the components value state. Triggers handle change on change and handleKeyDown on key presses */}
        <TextField
          id="textField"
          label="Title"
          color="secondary"
          variant="filled"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          fullWidth
        />
      </div>
      <div id="searchBarButtonsContainer">
        {/* Button component from MUI. Is for filters. When clicked runs openFilterDialog function from props. */}
        <Button
          className="searchBarButton"
          variant="contained"
          color="primary"
          onClick={props.openFilterDialog}
        >
          Filters
        </Button>
        <FilterDialog />
        {/* Button component from MUI. Is for search. When clicked runs handleClick */}
        <Button
          className="searchBarButton"
          onClick={handleClick}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default connector(SearchBar);
