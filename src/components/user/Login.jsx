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
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
    const url = "/user/login/";
    const payload = {
      email: this.state.email,
      password: this.state.password,
      "g-recaptcha-response": e.target[2].value
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.saved === "success") {
          localStorage.setItem("token", data.token);
          console.log(data.admin);
          this.props.handleToken(data.token, data.admin);
          if (data.admin) {
            this.props.history.push("/admin/");
          } else {
            this.props.history.push("/user/profile");
          }
        } else {
          const h2 = document.getElementById("error");
          h2.style.visibility = "visible";
          if (!(data.error instanceof Array)) {
            data.error = new Array(data.error);
          }
          data.error.map(error => (h2.innerHTML += error.msg + "\n"));
          setTimeout(function() {
            h2.style.visibility = "hidden";
          }, 5000);
        }
      });
  };

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div className="main">
        <form id="login_form" onSubmit={this.login_form_submit}>
          <h1>Login Form</h1>
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
          <input type="submit" value="Login" />
        </form>
        <h2 id="error" style={{ visibility: "hidden" }}>
          Errors :{" "}
        </h2>
        <div className="overlay">
          <div
            className="circular-loader"
            style={{ position: "absolute", top: "72vh", left: "58vw" }}
          ></div>
          <p style={{ position: "absolute", top: "88vh", left: "55vw" }}>
            Verifying Credentials...
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
