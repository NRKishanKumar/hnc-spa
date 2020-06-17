import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Dashboard from "../Dashboard";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [isLoading, setLoadingState] = useState(true);

  const showLoader = () => {
    setLoadingState(true);
  };
  const hideLoader = () => {
    setLoadingState(false);
  };

  return (
      <Router>
        <Header showLoader={showLoader} />
        <Switch>
          <>
            <Route
                exact
                key="home"
                path="/"
                render={() => (
                    <Dashboard
                        isLoading={isLoading}
                        hideLoader={hideLoader}
                        showLoader={showLoader}
                    />
                )}
            />
          </>
        </Switch>
        <Footer />
      </Router>
  );
};

export default App;
