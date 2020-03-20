import React, { Component } from "react";
import img1 from "../../../images/ticket1.png";
import img2 from "../../../images/ticket2.png";
class Booksidenavs1 extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="ticket">
          <img src={img1} />
          <div>
            <p>
              {this.props.train_name} ({this.props.train_no})
            </p>
            <p>
              Teir : {this.props.teir}, GENERAL Quota, {this.props.count}{" "}
              Travellers
            </p>
            <p>
              {new Date(this.props.depart_date).toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </p>
            <p>
              {" "}
              {this.props.src_stn.name} ({this.props.src_stn.code})
            </p>{" "}
            <p>
              Departure: {new Date(this.props.depart_date).toLocaleTimeString()}
              , {this.props.src_stn.code}
            </p>
            <p>
              {new Date(this.props.arrival_date).toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric"
              })}{" "}
              {this.props.des_stn.name} ({this.props.des_stn.code})
            </p>
            <p>
              {" "}
              Arrival: {new Date(this.props.arrival_date).toLocaleTimeString()},
              {this.props.des_stn.code}
            </p>
          </div>
          <img src={img2} />
        </div>
      </React.Fragment>
    );
  }
}

export default Booksidenavs1;
