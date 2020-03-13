import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile_register";
import Contact from "./components/contact";
import Train from "./components/train/train";
import Station from "./components/station/station";
import T_Route from "./components/route/route";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.css";

class App extends Component {
  state = {
    token: localStorage.getItem("token")
  };
  tokenhandler = token => {
    this.setState({ token: token });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar handleToken={this.tokenhandler} token={this.state.token} />
          <Switch>
            <Route path="/" exact component={Home} />

            {/* user routes */}

            <Route
              path="/user/login"
              render={props => (
                <Login {...props} handleToken={this.tokenhandler} />
              )}
            />
            <Route path="/user/register" component={Profile} />
            <Route path="/user/profile" component={Profile} />
            <Route path="/user/logout" component={Home} />

            {/* train routes */}

            <Route path="/admin/train/create" component={Train} />
            <Route path="/admin/trains" />
            <Route path="/admin/train/:id" exact />
            <Route path="/admin/train/:id/update" />
            <Route path="/admin/train/:id/delete" />
            <Route path="/admin/train/:id/book" />

            {/* train_route routes */}

            <Route path="/admin/route/create" component={T_Route} />
            <Route path="/admin/route/:id" exact />
            <Route path="/admin/route/:id/update" />
            <Route path="/admin/route/:id/delete" />
            <Route path="/admin/routes" />

            {/* station routes */}

            <Route path="/admin/station/create" component={Station} />
            <Route path="/admin/stations" />
            <Route path="/admin/station/:id" exact />
            <Route path="/admin/station/:id/update" />
            <Route path="/admin/station/:id/delete" />

            {/* ticket routes */}

            <Route path="/ticket/:id" exact />
            <Route path="/ticket/:id/cancel" />

            {/* other routes */}

            <Route path="/about" />
            <Route path="/contact" component={Contact} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
