import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class Searchheader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from_stn: this.props.src_stn._id,
      to_stn: this.props.des_stn._id,
      date: this.props.date,
      class: this.props.class
    };
  }

  submit = async (e, day) => {
    e.preventDefault();
    const url = "/booking/trains/";
    var date = new Date(this.state.date);
    if (day === 1) {
      date = moment(date)
        .add(1, "d")
        .format("YYYY-MM-DD");
    } else {
      date = moment(date)
        .add(-1, "d")
        .format("YYYY-MM-DD");
    }

    await this.setState({ date: date });
    const payload = { ...this.state };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.history.push({
          pathname: "/search/",
          search: "",
          state: { ...data, date: this.state.date, class: this.state.class }
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div id="n_o_t">{this.props.count} trains found</div>
        <div id="t_nav">
          <div>
            {this.props.src_stn.name + " - > " + this.props.des_stn.name}
          </div>
          <ul id="t_nav_links">
            <Link onClick={e => this.submit(e, -1)}>
              <li>Previous Day</li>
            </Link>
            <li>
              {new Date(this.props.date).toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short"
              })}
            </li>
            <Link onClick={e => this.submit(e, 1)}>
              <li>Next Day</li>
            </Link>
          </ul>
          <div>QUOTA</div>
        </div>
        <ul id="train_list_header">
          <li>Train name &amp; no.</li>
          <li id="train_list_header_sec2">
            <div>Departs </div>
            <div>Arrives</div>
            <div>Duration</div>
          </li>
          <li>Class</li>
          <li>Availability &amp; Fare</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Searchheader;
