import React from "react";
import { useParams } from "react-router-dom";

const UserPage: React.FunctionComponent = () => {
  const { userID } = useParams<{ userID: string }>();

  return <div>this is user: {userID}</div>;
};

export default UserPage;
