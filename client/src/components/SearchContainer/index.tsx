import React from "react";
import PageContainer from "../PageContainer";
import SearchBar from "../SearchBar";
import SearchResults from "../SearchResults";
import "./style.css";

// Simple component to easily structure other components.
// Has width 80% of total width for some space on the sides.
// Uses display flex column and gap for space between components.
// Has some padding on top as to not be hidden by the AppBar.
const SearchContainer: React.FunctionComponent = () => {
    return (
        <div id="searchContainer">
            <SearchBar />
            <PageContainer />
            <SearchResults />
            <PageContainer />
        </div>
    );
};

export default SearchContainer;
