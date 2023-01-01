import React from "react";
import Layout from "./component/Layout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
