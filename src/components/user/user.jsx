import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";
import Profile from "../user/Profile_register";

class User extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default User;
