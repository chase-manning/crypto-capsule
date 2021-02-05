import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatePage from "./CreatePage";
import SentPage from "./SentPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sent">
          <SentPage />
        </Route>
        <Route path="/">
          <CreatePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
