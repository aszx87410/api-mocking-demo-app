import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import SignInPage from "./components/SignInPage";

function AppRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/sign-in" />
        </Route>
        <Route path="/sign-in">
          <SignInPage />
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <AppRoute />
    </ThemeProvider>
  );
}

export default App;
