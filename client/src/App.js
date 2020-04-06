import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Navbar from "./components/layout/navbar";
import ContactState from "./context/contact/contactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import "./App.css";
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/about" component={About}></Route>
                  <Route exact path="/register" component={Register}></Route>
                  <Route exact path="/login" component={Login}></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
