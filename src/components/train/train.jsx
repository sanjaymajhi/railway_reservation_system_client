import React, { Component } from "react";
class Train extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      train_no: 0,
      available_tiers: [],
      departing_days: [],
      route: "",
      depart_time: "00:00:00",
      arrival_time: "00:00:00",
      coach_seats: 0,
      total_seats: 0,
      ticket_cost: 0,
      available_seats: 0,
      total_coaches: 0
    };
    this.loadRoutes();
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    if (name !== "available_tiers" && name !== "departing_days") {
      this.setState({ [name]: value });
    } else {
      const arr = this.state[name];
      arr.push(value);
      this.setState({ [name]: arr });
    }
  };

  loadRoutes = () => {
    fetch("/booking/routes/", { method: "GET" })
      .then(res => res.json())
      .then(data => {
        const select = document.getElementById("route");
        const option = document.createElement("option");
        option.innerHTML = "Select Route";
        option.disabled = true;
        option.selected = true;
        select.appendChild(option);
        for (let i = 0; i < data.list.length; i++) {
          const option = document.createElement("option");
          option.value = data.list[i]._id;
          option.innerHTML = data.list[i].route_code;
          select.appendChild(option);
        }
      });
  };

  submit = e => {
    e.preventDefault();
    this.setState({ available_seats: this.state.total_seats });
    const url = "/booking/train/create/";
    const payload = {
      ...this.state
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
          const h2 = document.getElementById("train_saved");
          h2.style.visibility = "visible";
          setTimeout(function() {
            h2.style.visibility = "hidden";
          }, 5000);
        } else {
          const h2 = document.getElementById("save_error");
          h2.style.visibility = "visible";
          data.error.map(error => (h2.innerHTML += error.msg + "\n"));
          setTimeout(function() {
            h2.style.visibility = "hidden";
          }, 5000);
        }
      });
  };

  render() {
    return (
      <div>
        <h1>Add Trains Page </h1>
        <form id="form" onSubmit={this.submit}>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="train_name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="train_no">Train No : </label>
          <input
            type="number"
            name="train_no"
            id="train_no"
            value={this.state.train_no}
            onChange={this.handleChange}
          />
          <label htmlFor="available_tiers">Available Tiers : </label>
          <div>
            <input
              type="checkbox"
              name="available_tiers"
              id="available_tiers"
              value="1A"
              onChange={this.handleChange}
            />
            1A
            <input
              type="checkbox"
              name="available_tiers"
              id="available_tiers"
              value="2A"
              onChange={this.handleChange}
            />
            2A
            <input
              type="checkbox"
              name="available_tiers"
              id="available_tiers"
              value="3A"
              onChange={this.handleChange}
            />
            3A
            <input
              type="checkbox"
              name="available_tiers"
              id="available_tiers"
              value="SL"
              onChange={this.handleChange}
            />
            SL
            <input
              type="checkbox"
              name="available_tiers"
              id="available_tiers"
              value="CC"
              onChange={this.handleChange}
            />
            CC
          </div>
          <label htmlFor="departing_days">Select departing days : </label>
          <div>
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="mon"
              onChange={this.handleChange}
            />
            Monday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="tue"
              onChange={this.handleChange}
            />
            Tuesday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="wed"
              onChange={this.handleChange}
            />
            Wednesday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="thu"
              onChange={this.handleChange}
            />
            Thursday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="fri"
              onChange={this.handleChange}
            />
            Friday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="sat"
              onChange={this.handleChange}
            />
            Saturday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="sun"
              onChange={this.handleChange}
            />
            Sunday
            <br />
          </div>
          <label htmlFor="route">Select Route</label>
          <select name="route" id="route" onChange={this.handleChange}></select>
          <label htmlFor="depart_time">departure time : </label>
          <input
            type="time"
            name="depart_time"
            id="depart_time"
            value={this.state.depart_time}
            onChange={this.handleChange}
          />
          <label htmlFor="arrival_time">arrival time : </label>
          <input
            type="time"
            name="arrival_time"
            id="arrival_time"
            value={this.state.arrival_time}
            onChange={this.handleChange}
          />
          <label htmlFor="coach_seats">coach seats : </label>
          <input
            type="number"
            name="coach_seats"
            id="coach_seats"
            value={this.state.coach_seats}
            onChange={this.handleChange}
          />
          <label htmlFor="total_coaches">Total Coaches : </label>
          <input
            type="number"
            name="total_coaches"
            id="total_coaches"
            value={this.state.total_coaches}
            onChange={this.handleChange}
          />
          <label htmlFor="total_seats">total_seats : </label>
          <input
            type="number"
            name="total_seats"
            id="total_seats"
            value={this.state.total_seats}
            onChange={this.handleChange}
          />
          <label htmlFor="ticket_cost">Ticket Cost : </label>
          <input
            type="number"
            name="ticket_cost"
            id="ticket_cost"
            value={this.state.ticket_cost}
            onChange={this.handleChange}
          />
          <div />
          <input type="submit" value="Save" />
        </form>
        <h2 id="train_saved" style={{ visibility: "hidden" }}>
          Train saved to database...
        </h2>
        <h2 id="save_error" style={{ visibility: "hidden" }}>
          Errors :{" "}
        </h2>
      </div>
    );
  }
}

export default Train;
