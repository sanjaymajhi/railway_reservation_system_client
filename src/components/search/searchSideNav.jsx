import React, { Component } from "react";
import { Link } from "react-router-dom";

class Searchsidenav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from_stn: "",
      to_stn: "",
      date: "",
      class: ""
    };
    this.loadStations();
  }
  loadStations = () => {
    fetch("/booking/stations/", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        const select1 = document.getElementById("from_stn");
        const select2 = document.getElementById("to_stn");
        for (let i = 0; i < data.list.length; i++) {
          const option1 = document.createElement("option");
          option1.value = data.list[i]._id;
          option1.innerHTML = data.list[i].name + " - " + data.list[i].code;
          select1.appendChild(option1);
          const option2 = document.createElement("option");
          option2.value = data.list[i]._id;
          option2.innerHTML = data.list[i].name + " - " + data.list[i].code;
          select2.appendChild(option2);
        }
      });
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  submit = e => {
    e.preventDefault();
    const url = "/booking/trains/";
    const payload = { ...this.state };
    console.log(payload);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  render() {
    console.log("inside search nav");
    console.log(this.props.data);
    return (
      <React.Fragment>
        <form onSubmit={this.submit} id="side_form">
          <p id="bold">Modify Search</p>
          <img src="images/rail_icon.png" alt="rail icon" />
          <br />
          <br />
          <label htmlFor="from_stn">Origin</label>
          <br />
          <select name="from_stn" id="from_stn" onChange={this.handleChange}>
            <option value="" selected="selected" disabled="disabled">
              From *
            </option>
          </select>
          <br />
          <br />
          <label htmlFor="to_stn">Destination</label>
          <br />
          <select name="to_stn" id="to_stn" onChange={this.handleChange}>
            <option value="" disabled="disabled" selected="selected">
              To *
            </option>
          </select>
          <br />
          <br />
          <label htmlFor="date">Journey Date</label>
          <br />
          <input type="date" name="date" onChange={this.handleChange} />
          <br />
          <br />
          <label htmlFor="class">Journey Class</label>
          <br />
          <select name="class" onChange={this.handleChange}>
            <option value="" disabled="disabled" selected="selected">
              Classes *
            </option>
            <option value="all">All Classses</option>
            <option value="1A">1A</option>
            <option value="2A">2A</option>
            <option value="3A">3A</option>
            <option value="SL">SL</option>
            <option value="CC">CC</option>
          </select>
          <br />
          <br />
          <input type="submit" value="Search" />
        </form>
      </React.Fragment>
    );
  }
}

export default Searchsidenav;
