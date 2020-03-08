import React, { Component } from "react";
class Register extends Component {
  state = {};
  render() {
    return (
      <form id="register_form" action="/user/register/" method="post">
        <label for="f_name">First Name : </label>
        <input id="f_name" type="text" name="f_name" />
        <label for="l_name">Last Name : </label>
        <input id="l_name" type="text" name="l_name" />
        <label for="username">Username : </label>
        <input id="username" type="text" name="username" />
        <label for="dob">Date of Birth : </label>
        <input id="dob" type="date" name="dob" />
        <label for="password">Password : </label>
        <input id="password" type="password" name="password" />
        <label for="email">Email : </label>
        <input id="email" type="email" name="email" />
        <label for="mobile">Mobile Number : </label>
        <input id="mobile" type="text" name="mobile" />
        <label for="gender">Gender :</label>
        <select id="gender" name="gender">
          <option value="" selected="selected" disabled="disabled">
            Select your Gender
          </option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Others</option>
        </select>
        <input type="submit" value="Register" />
      </form>
    );
  }
}

export default Register;
