import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutPage from "./AboutPage";
import CreatePage from "./CreatePage";
import ReceivedPage from "./ReceivedPage";
import SentPage from "./SentPage";
import { initWeb3 } from "../services/web3Service";

const App = () => {
  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/sent">
          <SentPage />
        </Route>
        <Route path="/received">
          <ReceivedPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/">
          <CreatePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
