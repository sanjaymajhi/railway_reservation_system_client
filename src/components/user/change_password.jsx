import React, { Component } from "react";
class Changepass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      c_pass: "",
      n_pass: ""
    };
  }

  handleChange = async e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    await this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const payload = { ...this.state, token: localStorage.getItem("token") };
    console.log(payload);
    fetch("/user/change_pass/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.saved === "success") {
          const saved = document.getElementById("saved");
          saved.style.display = "block";
          setTimeout(() => {
            saved.innerHTML = "";
            saved.style.display = "none";
          }, 5000);
        } else {
          const errors = document.getElementById("errors");
          if (data.error instanceof Array) {
            errors.innerHTML += data.error.map(err => err.msg);
          } else {
            errors.innerHTML += data.error.msg;
          }
          errors.style.display = "block";
          setTimeout(() => {
            errors.innerHTML = "Errors : ";
            errors.style.display = "none";
          }, 5000);
        }
      });
  };

  render() {
    return (
      <div className="admin-main">
        <h2>Change Password</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="c_pass">Current Password : </label>
          <input
            type="password"
            name="c_pass"
            id="c_pass"
            onChange={this.handleChange}
          />
          <label htmlFor="n_pass">New Password</label>
          <input
            type="password"
            name="n_pass"
            id="n_pass"
            onChange={this.handleChange}
          />
          <div></div>
          <input type="submit" value="Change Password" />
        </form>
        <h2 id="saved" style={{ display: "none" }}>
          Password Changed Successfully...
        </h2>
        <div id="errors" style={{ display: "none" }}>
          Errors :
        </div>
      </div>
    );
  }
}

export default Changepass;
