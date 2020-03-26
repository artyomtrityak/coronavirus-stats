import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from "./navigation";
import USDaily from "./visualizations/us-daily";
import USStates from "./visualizations/us-states";

export default () => {
  return (
    <Router>
      <div>
        <Navigation />
        <div className="container-fluid app-content">
          <Switch>
            <Route path="/visualizations/us-daily">
              <USDaily />
            </Route>
            <Route path="/visualizations/us-states">
              <USStates />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};