import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile_register";
import Contact from "./components/contact";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.css";
import Admin from "./components/admin/admin";
import Search from "./components/search/search";
import Book from "./components/book/book";

class App extends Component {
  state = {
    token: localStorage.getItem("token")
  };
  tokenhandler = token => {
    this.setState({ token: token });
  };
  render() {
    console.log("inside app");
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

            <Route path="/search" render={props => <Search {...props} />} />

            <Route path="/admin/" render={props => <Admin {...props} />} />

            {/* ticket routes */}
            <Route path="/book/" component={Book} />
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
