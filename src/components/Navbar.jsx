import React, { Component } from "react";

import { Link } from "react-router-dom";

import railway from "../images/railways.png";
import irctc from "../images/irctc_icon.jpeg";
class Navbar extends Component {
  logout = e => {
    this.props.handleToken(null);
    localStorage.removeItem("token");
  };
  render() {
    return (
      <div className="navbar">
        <Link className="nav-left" to="/">
          <img className="icon" src={railway} alt="indian railways" />
        </Link>
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

            <li>
              <img className="icon" src={irctc} alt="IRCTC icon" />
            </li>
          </ul>
        ) : (
          <ul id="navdiv2">
            <li>
              <a href="">profile</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/" onClick={this.logout}>
                Log Out
              </a>
            </li>
            <li>
              <img className="icon" src={irctc} alt="IRCTC icon" />
            </li>
          </ul>
        )}
      </div>
    );
  }
}

export default Navbar;
