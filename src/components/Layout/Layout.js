import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";


// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages

// context
import { useLayoutState } from "../../context/LayoutContext";
import Users from "../../pages/users/Users";
import Sites from "../../pages/sites/Sites";
import EditSites from "../../pages/editsites/EditSites";
import Systems from "../../pages/system/System";
import EditSensorDevices from "../../pages/sensors&devices/EditSensorDevices";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/sites" component={Sites} />
              <Route path="/app/systems" component={Systems} />
              <Route
                exact
                path="/app/settings"
                render={() => <Redirect to="/app/settings/sensordevice" />}
              />
              <Route path="/app/settings/sensordevice" component={EditSensorDevices} />
              <Route path="/app/settings/editsites" component={EditSites} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
