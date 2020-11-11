import React from "react";
import { AnyAction } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchResults } from "../../redux/search/searchActions";
import MovieContainer from "../MovieContainer";
import "./style.css";
import { ParamsInterface } from "../../interfaces/ParamsInterface";
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
    filterData: state.filter,
    sortData: state.sort,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchResults: (params: ParamsInterface) => dispatch(fetchResults(params)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const SearchResults: React.FunctionComponent<Props> = (props) => {
  // Extract properties and action from the redux state.
  const sort = props.sortData;
  const filters = props.filterData.filters;
  const currentPage = props.searchData.currentPage;
  const query = props.searchData.query;
  const fetchResults = props.fetchResults;

  // Function for creating a config object according to the ParamsInterface.
  // Because of the useCallback hook, this function only updates what it does when a dependency from the dependency list updates and not every time the component updates.
  const createConfig = React.useCallback(() => {
    let paramsObject: ParamsInterface = {
      q: query,
      page: currentPage,
      genre: filters.genre,
      duration: filters.duration,
      budget: filters.budget,
      sort: {
        type: sort.type,
        descending: sort.descending,
      },
    };
    return paramsObject;
  }, [query, currentPage, filters, sort]);

  // useEffect hook triggers when the component mounts and when any of the dependencies from the dependencies
  // Fetches results based on the current config file.
  React.useEffect(() => {
    fetchResults(createConfig());
  }, [query, currentPage, filters, sort, fetchResults, createConfig]);

  // Function that returns jsx based on the current redux state
  const getResults = () => {
    // If loading, return loading
    if (props.searchData.loading) {
      return <p>Loading</p>;
    } else if (props.searchData.error) {
      // If error, return error
      return <p>{props.searchData.error}</p>;
    } else if (props.searchData.results) {
      // If results exist ...
      // ... and length is zero, return query gave no results.
      if (props.searchData.results.length === 0) {
        return <p>Your query gave no results</p>;
      } else {
        // ... and length is larger than zero, map each element in results to a ResultContainer with corresponding props.
        return props.searchData.results.map((result) => (
          <MovieContainer
            key={result._id}
            id={result._id}
            title={result.title}
            posterPath={result.poster_path}
          />
        ));
      }
    }
  };

  // Returns the result from getResults.
  return <div id="results">{getResults()}</div>;
};

export default connector(SearchResults);
