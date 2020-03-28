import React, { Component } from "react";
import moment from "moment";
class Searchresults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      class: this.props.class === "all" ? "1A" : this.props.class
    };
  }

  classHandler = async e => {
    await this.setState({ class: e.target.value });
    const select = document.getElementById(
      "availability" + this.props.train._id
    );
    select.style.display = "block";
    const div = document.getElementById(
      "availability-div" + this.props.train._id
    );
    div.lastChild.innerHTML = "";
    div.style.display = "none";
    console.log(this.state);
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
    const depart_h = moment(this.props.train.depart_time).format("HH");
    const depart_m = moment(this.props.train.depart_time).format("mm");
    let depart_date = moment(this.props.date)
      .add("h", depart_h)
      .add("minute", depart_m)
      .format("YYYY-MM-DD HH:mm");

    const payload = { id: this.props.train._id, date: depart_date };
    fetch("/booking/train/status/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(availabilty => {
        const button = document.getElementById(
          "availability" + this.props.train._id
        );
        button.style.display = "none";
        const div = document.getElementById(
          "availability-div" + this.props.train._id
        );
        if (availabilty.status === "AVL") {
          //cannot use innerhtml as it will remove button
          const innerdiv = document.createElement("div");
          innerdiv.append("Available - " + availabilty.seats);
          innerdiv.appendChild(document.createElement("br"));
          innerdiv.append("Rs. " + cost);
          div.appendChild(innerdiv);
          div.style.display = "block";
          div.firstChild.onclick = () => {
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
          div.style.color = "red";
          div.innerHTML = "Not Available";
          div.style.display = "block";
        }
      });
  };
  render() {
    const train = this.props.train;
    const route = this.props.route;
    const depart_time = new Date(this.props.train.depart_time);
    const arrival_time = new Date(this.props.train.arrival_time);
    let duration = (arrival_time - depart_time) / (1000 * 60 * 60);
    let hours = duration - (duration % 1);
    let minutes = parseFloat((duration % 1) * 60).toPrecision(2);
    return (
      <React.Fragment>
        <div id="train-name">
          <div style={{ fontWeight: "600", fontSize: "25px" }}>
            {train.name}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "15px" }}>
            #{train.train_no}
          </div>
          <p style={{ fontWeight: "bold", fontSize: "12px" }}>
            Departs on : {train.departing_days.map(day => day + ", ")}
          </p>
        </div>
        <div>
          <h3>
            {new Date(train.depart_time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </h3>
          <p>
            <strong>{route.src_stn.code}</strong>
          </p>
          <p style={{ fontSize: "12px", color: "gray" }}>
            {" "}
            <strong>{route.src_stn.name}</strong>{" "}
          </p>
        </div>
        <div>
          <h3>{hours + "H " + minutes + "m"}</h3>
        </div>
        <div>
          <h3>
            {new Date(train.arrival_time).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </h3>
          <p>
            <strong>{route.des_stn.code}</strong>
          </p>
          <p style={{ fontSize: "12px", color: "gray" }}>
            {" "}
            <strong>{route.des_stn.name}</strong>
          </p>
        </div>
        {/* <select name="class" id="select-teir" onChange={this.classHandler}>
          {train.available_tiers.map(teir => (
            <option
              key={teir}
              value={teir}
              selected={teir === this.state.class ? true : false}
            >
              {teir}
            </option>
          ))}
        </select> */}
        <button
          // done so that on button click right button loads the value
          id={"availability" + this.props.train._id}
          className="availability"
          onClick={this.bookHandler}
        >
          NEARBY DATES
        </button>
        <div
          id={"availability-div" + this.props.train._id}
          style={{
            padding: "20px",
            color: "green",
            fontWeight: "bold",
            display: "none"
          }}
        >
          <button
            style={{
              fontWeight: "bold",
              border: "1px solid lightgray",
              padding: "10px"
            }}
          >
            Book Now
          </button>
          <br />
          <br />
        </div>
        <div id="nearby-date-results"></div>
      </React.Fragment>
    );
  }
}

export default Searchresults;
