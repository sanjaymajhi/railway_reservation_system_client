import React, { Component } from "react";

import { Link } from "react-router-dom";

import railway from "../images/railways.png";
import irctc from "../images/irctc_icon.jpeg";

import Clock from "react-live-clock";
class Navbar extends Component {
  logout = e => {
    this.props.handleToken(null);
    localStorage.removeItem("token");
  };
  date = new Date();
  render() {
    console.log("inside navbar");
    return (
      <div className="navbar">
        <Link className="nav-left" to="/">
          <img className="icon" src={railway} alt="indian railways" />
        </Link>
        <p>
          {this.date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </p>
        &nbsp;[
        <Clock format={"HH:mm:ss"} />]
        {!this.props.token ? (
          <ul id="navdiv1">
            <Link to="/contact">
              <li>Contact Us</li>
            </Link>
            <Link to="/user/login">
              <li>Login</li>
            </Link>
            <Link to="/user/register">
              <li>Register</li>
            </Link>
          </ul>
        ) : (
          <ul id="navdiv2">
            <li>{}</li>
            <Link to="/user/profile">
              <li>profile</li>
            </Link>
            <Link to="/contact">
              <li>Contact Us</li>
            </Link>
            <li>
              <a href="/" onClick={this.logout}>
                Log Out
              </a>
            </li>
          </ul>
        )}
        <img className="icon" src={irctc} alt="IRCTC icon" />
      </div>
    );
  }
}

export default Navbar;
