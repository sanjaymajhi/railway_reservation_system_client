import React, { Component } from "react";
import { Link } from "react-router-dom";

class Searchheader extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="n_o_t">{this.props.count} trains found</div>
        <div id="t_nav">
          <div>{this.props.src_stn + " - > " + this.props.des_stn}</div>
          <ul id="t_nav_links">
            <Link>
              <li>Previous Day</li>
            </Link>
            <li>
              {new Date(this.props.date).toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short"
              })}
            </li>
            <Link>
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
