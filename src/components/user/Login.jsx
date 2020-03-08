import React, { Component } from "react";
import { login_form_submit } from "../../scripts/user_auth";
class Login extends Component {
  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;

    document.body.appendChild(script);
  }
  render() {
    return (
      <form id="login_form" action={() => login_form_submit(this)}>
        <label htmlFor="email">Email ID : </label>
        <input
          id="email"
          type="email"
          name="email"
          value="1sanokhello@gmail.com"
        />
        <label htmlFor="password">Password : </label>
        <input id="password" type="text" name="password" value="0147258369" />
        <div />

        <div
          className="g-recaptcha"
          data-sitekey="6LdMetIUAAAAALN5cER-Dg7G1dF64-CFHG1F73zW"
        />
        <div />
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    );
  }
}

export default Login;
