import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Coronovirus Data
      </a>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/visualizations/us-daily">U.S. Daily</Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/visualizations/us-states">U.S. by State</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};
