import React, { Component } from "react";
import { gettopost, logout } from "../scripts/user_auth";

import { Link } from "react-router-dom";

import railway from "../images/railways.png";
import irctc from "../images/irctc_icon.jpeg";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <Link className="nav-left" to="/">
          <img className="icon" src={railway} alt="indian railways" />
        </Link>
        {!localStorage.getItem("token") ? (
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
              <a href={gettopost(this, "/user/profile")}>profile</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href={logout(this)}>Log Out</a>
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
