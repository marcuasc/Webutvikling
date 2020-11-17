import React from "react";
import "./style.css";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { connect, ConnectedProps } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Filters } from "../../redux/filter/filterTypes";
import {
  closeFilterDialog,
  setFilters,
} from "../../redux/filter/filterActions";
import { updateCurrentPage } from "../../redux/search/searchActions";
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
    filterData: state.filter,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    updateCurrentPage: (page: number) => dispatch(updateCurrentPage(page)),
    setFilters: (filterObject: Filters) => dispatch(setFilters(filterObject)),
    closeFilterDialog: () => dispatch(closeFilterDialog()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

// Declares a list of the genres we have. Is declared outside of the component as doesn't need to "update" when the component does.
const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];

const FilterDialog: React.FunctionComponent<Props> = (props) => {
  // Sets a list of strings in the state of the component. Initially set to be empty.
  // Is to be used for holding of the selected genres to filter on.
  const [selectedGenres, setSelectedGenres] = React.useState<Array<string>>(
    props.filterData.filters.genre === undefined
      ? []
      : props.filterData.filters.genre
  );

  // Sets a list of ReactElemets in the state of the component. Initially set to be empty.
  // Is to be used for holding the buttons for the genres to toggle.
  const [genreButtons, setGenreButtons] = React.useState<React.ReactElement[]>(
    []
  );

  // Sets an object in the state of the component. Initially set to greater than (gt) 0, less than (lt) infinity.
  // Is to be used for holding the current value of the duration filtration and the creation of the filterObject.
  const [durationObject, setDurationObject] = React.useState(
    props.filterData.filters.duration === undefined
      ? {
          gt: 0,
          lt: Infinity,
        }
      : props.filterData.filters.duration
  );

  // Sets an object in the state of the component. Initially set to greater than (gt) 0, less than (lt) infinity.
  // Is to be used for holding the current value of the budget filtration and the creation of the filterObject.
  const [budgetObject, setBudgetObject] = React.useState(
    props.filterData.filters.budget === undefined
      ? {
          gt: 0,
          lt: Infinity,
        }
      : props.filterData.filters.budget
  );

  // Function that is responsible for toggling a genre. Takes in genre as a string.
  // Because of the useCallback hook, this function only updates what it does when a dependency from the dependency list updates and not every time the component updates.
  const toggleGenre = React.useCallback(
    (genre: string) => {
      // If the genre already is selected, it filters it out from selected genres and stores it in newGenres.
      // It then updates the state with the newGenres.
      if (selectedGenres.includes(genre)) {
        const newGenres = selectedGenres.filter((g) => g !== genre);
        setSelectedGenres(newGenres);
      } else {
        // If not, create newGenres from selectedGenres and push the genre into it.
        // Then sets the selected genres in the state to the elementts of newGenres
        const newGenres = selectedGenres;
        newGenres.push(genre);
        setSelectedGenres([...newGenres]);
      }
    },
    [selectedGenres]
  );

  // Function that creates buttons according to the genre and selectedGenres lists and stores them in the genreButtons state.
  // Because of the useCallback hook, this function only updates what it does when a dependency from the dependency list updates and not every time the component updates.
  const updateGenreButtons = React.useCallback(() => {
    const newButtons: React.ReactElement[] = [];
    // For every genre ...
    genres.forEach((genre, i) => {
      const button = (
        // ... create a MUI Button component with variant according to if it is selected.
        // When clicked, triggers toggleGenre with its genre as input.
        <Button
          key={i}
          color="primary"
          variant={selectedGenres.includes(genre) ? "contained" : "outlined"}
          onClick={() => toggleGenre(genre)}
        >
          {genre}
        </Button>
      );
      // Then push it to the newButtons list ...
      newButtons.push(button);
    });
    // ... and update the state with the new buttons
    setGenreButtons(newButtons);
  }, [selectedGenres, toggleGenre]);

  // Function that creates a filter object according the the Filters interface from redux.
  const createFilterObject = () => {
    let filterObject: Filters = {};
    // If any genres are selected, set the filterObjects genre field to the selectedGenres.
    if (selectedGenres.length > 0) {
      filterObject.genre = selectedGenres;
    }
    // If any duration fields are set, set the filterObjects duration field to the durationObject.
    if (durationObject.gt > 0 || durationObject.lt < Infinity) {
      filterObject.duration = durationObject;
    }
    // If any budget fields are set, set the filterObjects budget field to the budgetObject.
    if (budgetObject.gt > 0 || budgetObject.lt < Infinity) {
      filterObject.budget = budgetObject;
    }
    // Then return it
    return filterObject;
  };

  // Function that triggers when the FilterDialog is to be closed.
  // As the filters will be updated, and a new search is to be executed, the current page needs to be set to 1 as to not search on a page that doesn't exist.
  // Sets the filters in the state to a new filterObject from createFilterObject.
  // Closes the filterDialog with the closeFilterDialog action.
  const handleClose = () => {
    props.updateCurrentPage(1);
    props.setFilters(createFilterObject());
    props.closeFilterDialog();
  };

  // Runs updateGenres function when the component mounts and when the updateGenreButtons function updates.
  React.useEffect(() => {
    updateGenreButtons();
  }, [updateGenreButtons]);

  return (
    // Dialog component from MUI. Open prop set to the open prop from the component (that comes from the redux state).
    // When closed (clicking outside the dialog, runs handleClose)
    <Dialog open={props.filterData.open} onClose={handleClose} id="filters">
      <DialogTitle>Filters</DialogTitle>
      <DialogContent>
        <DialogContentText>Genres</DialogContentText>
        {/* Gets the genreButtons from the state of the component */}
        <div className="genreButtons">{genreButtons}</div>
        <div>
          <DialogContentText>Duration (minutes)</DialogContentText>
        </div>
        <div className="numberInputs">
          {/* TextField for the "From" part of duration. Minimum is set to 0.
                    Displays blank if the value is 0, otherwise displays the gt value of the durationObject in the state.
                    When changed, if its blank, set the gt value to 0 and the lt value to what it was. If not, set the gt to he new value. */}
          <TextField
            label="From"
            variant="filled"
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            value={durationObject.gt === 0 ? "" : durationObject.gt}
            onChange={(event) => {
              event.target.value === ""
                ? setDurationObject({
                    gt: 0,
                    lt: durationObject.lt,
                  })
                : setDurationObject({
                    gt: parseInt(event.target.value),
                    lt: durationObject.lt,
                  });
            }}
          ></TextField>
          {/* TextField for the "To" part of duration. Minimum is set to 0.
                    Displays blank if the value is infinity, otherwise displays the lt value of the durationObject in the state.
                    When changed, if its blank, set the lt value to infinity and the gt value to what it was. If not, set the lt to he new value. */}
          <TextField
            label="To"
            variant="filled"
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            value={durationObject.lt === Infinity ? "" : durationObject.lt}
            onChange={(event) => {
              event.target.value === ""
                ? setDurationObject({
                    gt: durationObject.gt,
                    lt: Infinity,
                  })
                : setDurationObject({
                    gt: durationObject.gt,
                    lt: parseInt(event.target.value),
                  });
            }}
          ></TextField>
        </div>
        <div>
          <DialogContentText>Budget (dollars)</DialogContentText>
        </div>
        <div className="numberInputs">
          {/* TextField for the "From" part of budget. Minimum is set to 0.
                    Displays blank if the value is 0, otherwise displays the gt value of the budgetObject in the state.
                    When changed, if its blank, set the gt value to 0 and the lt value to what it was. If not, set the gt to he new value. */}
          <TextField
            label="From"
            variant="filled"
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            value={budgetObject.gt === 0 ? "" : budgetObject.gt}
            onChange={(event) => {
              event.target.value === ""
                ? setBudgetObject({
                    gt: 0,
                    lt: budgetObject.lt,
                  })
                : setBudgetObject({
                    gt: parseInt(event.target.value),
                    lt: budgetObject.lt,
                  });
            }}
          ></TextField>
          {/* TextField for the "To" part of budget. Minimum is set to 0.
                    Displays blank if the value is infinity, otherwise displays the lt value of the budgetObject in the state.
                    When changed, if its blank, set the lt value to infinity and the gt value to what it was. If not, set the lt to he new value. */}
          <TextField
            label="To"
            variant="filled"
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            value={budgetObject.lt === Infinity ? "" : budgetObject.lt}
            onChange={(event) => {
              event.target.value === ""
                ? setBudgetObject({
                    gt: budgetObject.gt,
                    lt: Infinity,
                  })
                : setBudgetObject({
                    gt: budgetObject.gt,
                    lt: parseInt(event.target.value),
                  });
            }}
          ></TextField>
        </div>
      </DialogContent>
      <DialogActions>
        {/* Close button that runs handle close when clicked. */}
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connector(FilterDialog);
