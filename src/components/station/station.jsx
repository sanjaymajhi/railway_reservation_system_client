import React, { Component } from "react";
class Station extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      code: ""
    };
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    const payload = { ...this.state };
    const url = "/booking/station/create/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(status => {
        if (status.saved === "success") {
          let h1 = document.getElementById("stat_add");
          h1.style.visibility = "visible";
          setTimeout(() => {
            h1.style.visibility = "hidden";
          }, 5000);
        } else {
          let h1 = document.getElementById("error");
          h1.style.visibility = "visible";
          status.error.map(error => (h1.innerHTML += error.msg + "\n"));
          setTimeout(() => {
            h1.style.visibility = "hidden";
            h1.innerHTML = "Errors : ";
          }, 5000);
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Station Page</h1>
        <form id="form" onSubmit={this.submit}>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
          />
          <label htmlFor="code">Station Code : </label>
          <input
            type="text"
            name="code"
            id="code"
            onChange={this.handleChange}
          />
          <div />
          <input type="submit" value="Save" />
        </form>
        <h1 id="stat_add" style={{ visibility: "hidden" }}>
          Station added to database...
        </h1>
        <h1 id="error" style={{ visibility: "hidden" }}>
          Error :{" "}
        </h1>
      </React.Fragment>
    );
  }
}

export default Station;
