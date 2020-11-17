import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";

const BackButton: React.FunctionComponent = () => {
  // The useHistory hook gives access to the history instance used for navigation.
  const history = useHistory();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBack />}
        // When clicked, goes back in the history instance.
        onClick={() => {
          history.goBack();
        }}
      >
        Back
      </Button>
    </>
  );
};

export default BackButton;
