import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  login_form_submit = e => {
    e.preventDefault();
    const url = "/user/login/";
    const payload = {
      email: this.state.email,
      password: this.state.password,
      "g-recaptcha-response": e.target[2].value
    };
    console.log(payload);

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(token => {
        localStorage.setItem("token", token);
        this.props.handleToken(token);
        this.props.history.push("/user/profile");
      });
  };

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    console.log(this.state);
    return (
      <form id="login_form" onSubmit={this.login_form_submit}>
        <label htmlFor="email">Email ID : </label>
        <input
          id="email"
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password : </label>
        <input
          id="password"
          name="password"
          type="text"
          value={this.state.password}
          onChange={this.handleChange}
        />
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
