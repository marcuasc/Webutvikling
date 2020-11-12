import { Pagination } from "@material-ui/lab";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../interfaces/RootState";
import { updateCurrentPage } from "../../redux/search/searchActions";
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
    searchData: state.search,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    updateCurrentPage: (page: number) => dispatch(updateCurrentPage(page)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const PageContainer: React.FunctionComponent<Props> = (props) => {
  // Extracts necassary action and properties from the redux state.
  const updateCurrentPage = props.updateCurrentPage;

  // Set the width of the page in the state.
  const [width, setWidth] = React.useState(window.innerWidth);

  // Sets an eventlistener on the window. When it resizes, it updates the components width state with the current width of the page.
  window.addEventListener("resize", () => setWidth(window.innerWidth));

  // Function that triggers when any page is clicked. Takes in a ChangeEvent and value. The change event is not used, and the value corresponds to the page number that was clicked.
  // Updates the current page in the redux state with the page that was clicked.
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    updateCurrentPage(value);
  };

  return (
    // Pagination component from MUI. Sets the size according to the window width.
    // className according to the style state.
    // count according to the current total pages from redux state.
    // page according to the current page from redux state.
    // Triggers handleChange when a new page is clicked.
    <Pagination
      color="primary"
      shape="rounded"
      size={width <= 430 ? "small" : width <= 520 ? "medium" : "large"}
      variant="text"
      className={"pagination"}
      count={props.searchData.totalPages}
      page={props.searchData.currentPage}
      onChange={handleChange}
    />
  );
};

export default connector(PageContainer);
