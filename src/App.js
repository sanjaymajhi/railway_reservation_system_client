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

            <Route path="/train/create" component={Train} />
            <Route path="/trains" />
            <Route path="/train/:id" exact />
            <Route path="/train/:id/update" />
            <Route path="/train/:id/delete" />
            <Route path="/train/:id/book" />

            {/* train_route routes */}

            <Route path="/route/create" component={T_Route} />
            <Route path="/route/:id" exact />
            <Route path="/route/:id/update" />
            <Route path="/route/:id/delete" />
            <Route path="/routes" />

            {/* station routes */}

            <Route path="/station/create" component={Station} />
            <Route path="/stations" />
            <Route path="/station/:id" exact />
            <Route path="/station/:id/update" />
            <Route path="/station/:id/delete" />

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
