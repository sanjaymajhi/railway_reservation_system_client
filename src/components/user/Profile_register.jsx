import React, { Component } from "react";
import moment from "moment";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: false,
      dob: "",
      email: "",
      f_name: "",
      gender: "",
      l_name: "",
      mobile: 0,
      trains_booked: [],
      username: "",
      password: ""
    };
    this.getProfile();
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  getProfile() {
    const token = localStorage.getItem("token");
    const url = "/user/profile/";
    let data = {
      token: token
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(details => {
        this.setState({
          admin: details.admin,
          dob: moment(details.dob).format("YYYY-MM-DD"),
          email: details.email,
          f_name: details.f_name,
          gender: details.gender,
          l_name: details.l_name,
          mobile: details.mobile,
          trains_booked: details.trains_booked,
          username: details.username
        });
      });
  }

  updateProfile = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = "/user/update/";
    let data = {
      token: token,
      ...this.state
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.updated === "success") {
          const h2 = document.getElementById("update_visible");
          h2.style.visibility = "visible";
          setTimeout(function() {
            h2.style.visibility = "hidden";
          }, 5000);
        }
      });
  };

  register = e => {
    e.preventDefault();
    const url = "/user/register/";
    let data = {
      ...this.state
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.registration === "success") {
          alert("Registration Successful...\nProceed to Login.");
          this.props.history.push("/user/login/");
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="admin">
          <form
            id="register_form"
            onSubmit={
              localStorage.getItem("token") ? this.updateProfile : this.register
            }
            method="post"
          >
            <h1 style={{ gridColumn: "span 2" }}>
              {localStorage.getItem("token") ? "Profile" : ""}
            </h1>

            <label htmlFor="f_name">First Name : </label>
            <input
              id="f_name"
              type="text"
              name="f_name"
              value={this.state.f_name}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="l_name">Last Name : </label>
            <input
              id="l_name"
              type="text"
              name="l_name"
              value={this.state.l_name}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="username">Username : </label>
            <input
              id="username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="dob">Date of Birth : </label>
            <input
              id="dob"
              type="date"
              name="dob"
              value={this.state.dob}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="password">Password : </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={this.handleChange}
              required
            />
            <label htmlFor="email">Email : </label>
            <input
              id="email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="mobile">Mobile Number : </label>
            <input
              id="mobile"
              type="text"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
              required
            />
            <label htmlFor="gender">Gender :</label>
            <select
              id="gender"
              name="gender"
              onChange={this.handleChange}
              required
            >
              {localStorage.getItem("token") ? (
                ""
              ) : (
                <option value="" selected="selected" disabled>
                  Choose Gender
                </option>
              )}
              <option
                value="M"
                selected={this.state.gender === "M" ? true : false}
              >
                Male
              </option>
              <option
                value="F"
                selected={this.state.gender === "F" ? true : false}
              >
                Female
              </option>
              <option
                value="O"
                selected={this.state.gender === "O" ? true : false}
              >
                Others
              </option>
            </select>
            <div></div>
            <input
              type="submit"
              value={localStorage.getItem("token") ? "Update" : "Register"}
            />
          </form>
          <h2 id="update_visible" style={{ visibility: "hidden" }}>
            Profile Updated...
          </h2>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
