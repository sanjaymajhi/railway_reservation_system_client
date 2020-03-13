import React, { Component } from "react";

import A_nav from "../admin/admin_nav";
class T_Route extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      src_stn: "",
      des_stn: "",
      stations: [],
      distance: 0,
      route_code: ""
    };
  }

  countHandler = e => {
    const target = e.target;
    const url = "/booking/stations/";
    fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(station_list => {
        let select_div = document.getElementById("select_div");
        select_div.innerHTML = "";
        const value = target.value;
        for (let i = 0; i < value; i++) {
          let label = document.createElement("label");
          label.htmlFor = "station" + i.toString();
          label.innerHTML = "Station " + (i + 1).toString() + ": ";
          let select = document.createElement("select");
          select.name = select.id = "station" + i.toString();
          select.onchange = this.handleChange;

          //adding select selection as disabled and selected option
          const option = document.createElement("option");
          option.innerHTML = "Select Station";
          option.disabled = true;
          option.selected = true;
          select.appendChild(option);

          //adding all other options
          station_list.list.map(station => {
            const option = document.createElement("option");
            option.value = station._id;
            option.innerHTML = station.name + " - " + station.code;
            select.appendChild(option);
          });

          select_div.appendChild(label);
          select_div.appendChild(select);
        }
      });
  };

  submit = async e => {
    e.preventDefault();
    await this.setState({
      src_stn: this.state.stations[0],
      des_stn: this.state.stations[this.state.stations.length - 1]
    });
    const select = document.getElementById("select_div");
    select.innerHTML = "";
    const payload = {
      src_stn: this.state.src_stn,
      des_stn: this.state.des_stn,
      stations: this.state.stations,
      distance: this.state.distance,
      route_code: this.state.route_code
    };
    console.log(payload);
    fetch("/booking/route/create", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.saved === "success") {
          const h2 = document.getElementById("route_saved");
          h2.style.visibility = "visible";
          setTimeout(function() {
            h2.style.visibility = "hidden";
          }, 5000);
          this.setState({
            count: 0,
            src_stn: "",
            des_stn: "",
            stations: [],
            distance: 0,
            route_code: ""
          });
        }
      });
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    if (name !== "distance" && name !== "route_code") {
      const stations = this.state.stations;
      stations.push(value);
      this.setState({ stations: stations });
      //Here is an error if selection is done using keyboard not by mouse
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <div className="admin">
        <A_nav />
        <div className="a_main">
          <h1>Route Create : </h1>
          <form id="form" onSubmit={this.submit}>
            <label htmlFor="route_code">Route Code : </label>
            <input
              type="text"
              name="route_code"
              id="route_code"
              onChange={this.handleChange}
            />
            <label htmlFor="distance">Distance : </label>
            <input
              type="number"
              name="distance"
              id="distance"
              onChange={this.handleChange}
            />
            <label htmlFor="count">No. of stations : </label>
            <input type="number" name="count" onChange={this.countHandler} />

            <div id="select_div"></div>
            <input type="submit" value="Save" />
          </form>
          <h1 id="route_saved" style={{ visibility: "hidden" }}>
            Route saved to database...
          </h1>
        </div>
      </div>
    );
  }
}

export default T_Route;
