import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "./Content";
import Header from "./Header";

const Layout = () => {
  return (
    <React.Fragment>
      <div>
        <Header />
      </div>

      <div>
        <Content />
      </div>
    </React.Fragment>
  );
};

export default Layout;
