import { Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";

const BackButton: React.FunctionComponent = () => {
  const history = useHistory();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBack />}
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
