import React, { Component } from "react";
import img1 from "../../../images/ticket1.png";
import img2 from "../../../images/ticket2.png";
import { toWords } from "number-to-words";
class Booksidenavs23 extends Component {
  render() {
    const conFee = ["1A", "2A", "3A"].indexOf(this.props.teir) === -1 ? 15 : 35;
    const gst = (this.props.cost + conFee) * 0.05;
    const totalFare = this.props.cost + conFee + gst;
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
            <p>Ticket Fare : {"Rs. " + this.props.cost}</p>
            <p>
              Convenience Fee :{"Rs. " + conFee}
              {}
            </p>
            <p>GST : {"Rs. " + gst}</p>
            <p>Total Fare : {"Rs. " + totalFare}</p>
            <p>RUPEES {toWords(totalFare).toUpperCase()}</p>
          </div>
          <img src={img2} />
        </div>
      </React.Fragment>
    );
  }
}

export default Booksidenavs23;
