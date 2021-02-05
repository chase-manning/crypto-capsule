import React from "react";
import { Switch, Route } from "react-router-dom";
import CreatePage from "./CreatePage";

const App = () => {
  return (
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
  );
};

export default App;
