import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import Profile from "../user/Profile_register";
import Unav from "./u_nav";

class User extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div className="admin">
        <Unav />
        <Switch>
          <Route
            path="/user/profile"
            exact
            render={props => <Profile {...props} admin={false} />}
          />
          {/* train routes */}

          <Route path="/user/" />

          {/* train_route routes */}

          <Route path="/user/" />

          {/* station routes */}

          <Route path="/user/" />
        </Switch>
      </div>
    );
  }
}

export default User;
