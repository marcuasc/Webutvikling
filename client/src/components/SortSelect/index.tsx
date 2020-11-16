import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../interfaces/RootState";
import {
  setSortDirectionAscending,
  setSortDirectionDescending,
  setSortTypeBudget,
  setSortTypeDuration,
  setSortTypeTitle,
} from "../../redux/sort/sortActions";
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
    sortData: state.sort,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    setSortTypeTitle: () => dispatch(setSortTypeTitle()),
    setSortTypeDuration: () => dispatch(setSortTypeDuration()),
    setSortTypeBudget: () => dispatch(setSortTypeBudget()),
    setSortDirectionAscending: () => dispatch(setSortDirectionAscending()),
    setSortDirectionDescending: () => dispatch(setSortDirectionDescending()),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const SortSelect: React.FunctionComponent<Props> = (props) => {
  // Extracts the descending attribute from the redux state.
  const descending = props.sortData.descending;

  // Function that triggers when the Select component changes value.
  // Takes in an event where the value is unknown. This is because the support for TypeScript in MUI isn't perfect. It is always a string and therefore we cast the value as string.
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    // Gets the value from the event.
    const value = event.target.value as string;
    // Update the redux state according to the value.
    if (value === "title") {
      props.setSortTypeTitle();
    } else if (value === "duration") {
      props.setSortTypeDuration();
    } else if (value === "budget") {
      props.setSortTypeBudget();
    }
  };

  return (
    <>
      {/* Uses FormControl from MUI for the cool label effect */}
      <FormControl fullWidth variant="outlined">
        <InputLabel>Sort by:</InputLabel>
        {/* Select component from MUI. Default value set to title. When changed, trigger handleChange */}
        <Select
          className="select"
          variant="outlined"
          defaultValue={props.sortData.type}
          label="Sort by:"
          onChange={handleChange}
        >
          {/* MenuItems from MUI for the sort types. */}
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
          <MenuItem value="budget">Budget</MenuItem>
        </Select>
      </FormControl>
      {/* MUI IconButton for sort direction. Updates the redux state to the correct value. */}
      <IconButton
        className="iconButton"
        onClick={() => {
          descending
            ? props.setSortDirectionAscending()
            : props.setSortDirectionDescending();
        }}
      >
        {/* Shows the correct arrow according to the sort direction. */}
        {descending ? <ArrowDownward /> : <ArrowUpward />}
      </IconButton>
    </>
  );
};

export default connector(SortSelect);
