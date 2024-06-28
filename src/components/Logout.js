import React from "react";
import { Redirect } from "react-router-dom";

const Logout = ({ onLogout }) => {
  onLogout();
  return <Redirect to="/login" />;
};

export default Logout;
