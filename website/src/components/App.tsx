import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatePage from "./CreatePage";

const App = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path="/about">
        <About />
      </Route>
      <Route path="/users">
        <Users />
      </Route> */}
        <Route path="/">
          <CreatePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
