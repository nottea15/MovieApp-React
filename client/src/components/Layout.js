import { Container } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div>{children}</div>
    </React.Fragment>
  );
};

export default Layout;
