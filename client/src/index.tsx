import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { store } from "./state/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import GlobalStyles from "./styles/GlobalStyles";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
