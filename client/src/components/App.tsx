import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import ReceivedPage from "./ReceivedPage";
import SentPage from "./SentPage";
import HomePage from "./HomePage";
import { getTokens } from "../services/tokenService";
import { setTokens } from "../state/tokenSlice";
import Header from "./Header";
import Footer from "./Footer";
import CapsulePage from "./CapsulePage";

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--bg);
  overflow-x: hidden;
`;

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  const updateTokens = async () => {
    const tokens = await getTokens();
    dispatch(setTokens(tokens));
  };

  const init = async () => {
    updateTokens();

    (window as any).ethereum.on("chainChanged", async () => {
      await updateTokens();
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <StyledApp>
      <Router>
        <Header />
        <Switch>
          <Route path="/sent">
            <SentPage />
          </Route>
          <Route path="/received">
            <ReceivedPage />
          </Route>
          <Route path="/capsule/:capsuleId">
            <CapsulePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </StyledApp>
  );
};

export default App;
