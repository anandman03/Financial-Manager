import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import NavbarComponent from "./partials/navbar";
import SignInComponent from "./authentication/signin.jsx";
import SignUpComponent from "./authentication/signup.jsx";
import ExpenseTrackerComponent from './expense-tracker/index.jsx';
import CryptoTradingComponent from './crypto-tracker/index.jsx';
import ErrorComponent from "./error/error.jsx";

function App() {
  return (
		<BrowserRouter>
    <NavbarComponent />
      <Switch>
        <Route exact path="/"><Redirect to="/auth/signin" /> </Route>
        <Route exact path="/auth/signin" component={SignInComponent}></Route>
        <Route exact path="/auth/signup" component={SignUpComponent}></Route>
        <Route exact path="/app/expense-tracker" component={ExpenseTrackerComponent}></Route>
        <Route exact path="/app/crypto-tracker" component={CryptoTradingComponent}></Route>
        <Route exact path="*" component={ErrorComponent}></Route>
      </Switch>
		</BrowserRouter>
	);
}

export default App;
