import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import AboutPage from "./AboutPage";
import CreatePage from "./CreateCapsule";
import ReceivedPage from "./ReceivedPage";
import SentPage from "./SentPage";
import HomePage from "./HomePage";
import { getTokens } from "../services/tokenService";
import { setTokens } from "../state/tokenSlice";
import { getAddress } from "../services/contracthelper";
import { setAddress } from "../state/userSlice";

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  const init = async () => {
    const tokens = await getTokens();
    dispatch(setTokens(tokens));

    const address = await getAddress();
    dispatch(setAddress(address));
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
