import React, { Component } from "react";
class Searchresults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      class: "1A"
    };
  }
  classHandler = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };
  bookHandler = e => {
    var cost = this.props.train.ticket_cost;

    switch (this.state.class) {
      case "1A":
        cost *= 2.5;
        break;
      case "2A":
        cost *= 2;
        break;
      case "3A":
        cost *= 1.5;
        break;
      case "CC":
        cost *= 0.5;
        break;
      default:
        cost *= 1;
    }
    const payload = { id: this.props.train._id, date: this.props.date };
    fetch("/booking/train/status/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(availabilty => {
        const button = document.getElementById("availability");

        if (availabilty.status === "AVL") {
          const div = document.createElement("div");
          div.style.padding = "20px";
          div.style.color = "green";
          div.style.fontWeight = "bold";
          const newButton = document.createElement("button");
          newButton.innerHTML = "Book Now";
          newButton.style.fontWeight = "bold";
          newButton.style.border = "1px solid lightgray";
          newButton.style.padding = "10px";

          div.innerHTML =
            "Available - " + availabilty.seats + "<br/>Rs. " + cost + "<br/>";
          div.appendChild(newButton);
          button.replaceWith(div);
          newButton.onclick = () => {
            this.props.history.push({
              pathname: "../book/",
              search: "",
              state: {
                ...this.props.train,
                ...this.props.route,
                date: this.props.date,
                teir: this.state.class,
                cost: cost,
                availability: availabilty
              }
            });
          };
        } else {
          const div = document.createElement("div");
          div.style.padding = "20px";
          div.style.color = "red";
          div.style.fontWeight = "bold";
          div.innerHTML = "Not Available";
          button.replaceWith(div);
        }
      });
  };
  render() {
    const train = this.props.train;
    const route = this.props.route;
    return (
      <React.Fragment>
        <div id="train-name">
          <div>
            {train.name}({train.train_no})
          </div>
          <div>
            {route.src_stn.name}->{route.des_stn.name}
          </div>
          <div>Departs on : {train.departing_days.map(day => day + ", ")}</div>
        </div>
        <div id="train-timing">
          <div>{new Date(train.depart_time).toLocaleTimeString()}</div>
          <div>{new Date(train.arrival_time).toLocaleTimeString()}</div>
          <div>17 hours</div>
        </div>
        <select name="class" id="select-teir" onChange={this.classHandler}>
          {train.available_tiers.map(teir => (
            <option key={teir} value={teir}>
              {teir}
            </option>
          ))}
        </select>
        <button id="availability" onClick={this.bookHandler}>
          Check availability and fare
        </button>
      </React.Fragment>
    );
  }
}

export default Searchresults;
