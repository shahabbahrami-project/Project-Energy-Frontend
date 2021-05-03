import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

//jwt Decoder
import jwt_decode from "jwt-decode";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";


// context
import { useUserState } from "../context/UserContext";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <>
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/sites" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/sites" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  <ToastContainer/>

  </>
  );

  function PrivateRoute({ component, ...rest }) {
  
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
