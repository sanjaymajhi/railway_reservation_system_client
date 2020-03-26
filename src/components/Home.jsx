import React, { Component } from "react";
import moment from "moment";

class Home extends Component {
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
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.found === "success") {
          this.props.history.push({
            pathname: "/search/",
            search: "",
            state: { ...data, date: this.state.date, class: this.state.class }
          });
        } else {
          alert(data.error.msg);
        }
      });
  };
  render() {
    return (
      <div className="main">
        <div id="train-search-form">
          <div>Train Ticket Booking</div>
          <form onSubmit={this.submit}>
            <div>
              <select
                name="from_stn"
                id="from_stn"
                onChange={this.handleChange}
              >
                <option value="" selected="selected" disabled="disabled">
                  From
                </option>
              </select>
            </div>
            <div>
              <select name="to_stn" id="to_stn" onChange={this.handleChange}>
                <option value="" disabled="disabled" selected="selected">
                  To
                </option>
              </select>
            </div>
            <div>
              <select name="class" onChange={this.handleChange}>
                <option value="" disabled="disabled" selected="selected">
                  Classes
                </option>
                <option value="all">All Classses</option>
                <option value="1A">1A</option>
                <option value="2A">2A</option>
                <option value="3A">3A</option>
                <option value="SL">SL</option>
                <option value="CC">CC</option>
              </select>
            </div>
            <div>
              <input
                type="date"
                name="date"
                min={moment().format("YYYY-MM-DD")}
                max={moment(Date.now())
                  .add(90, "d")
                  .format("YYYY-MM-DD")}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input type="submit" value="Search Trains" />
            </div>
          </form>
        </div>
        <div id="feature">
          <div>
            <h3>Easy Payment</h3>
            <p>Pay using any credit/debit card,wallet,net banking</p>
          </div>
          <div>
            <h3>Quick Book</h3>
            <p>Sort, filter and recommendations for fast, easy booking</p>
          </div>
          <div>
            {" "}
            <h3>Fastest Refund</h3>
            <p>Instant refund with easy step by step tracking</p>
          </div>
        </div>

        <div id="faq">
          <h2>FAQ</h2>
          <h3>Q) How to book train tickets via RailYatri?</h3>
          <p>
            <strong>Ans. </strong> Now book your train tickets in a jiffy with
            these easy steps & get your PNR:
            <ul>
              <li>
                - Visit BookYourJourney.com to select the boarding & arrival
                destinations.
              </li>
              <li>
                - Select a train that is best suited. Further, fill in your
                correct passenger information.
              </li>
              <li>- Proceed to our easy payment gateway.</li>
              <li>
                - Ticket booking confirmation Email, SMS, WhatsApp message is
                sent to our users registered details.
              </li>
            </ul>
            Our users can also sort, filter and view recommendations for best
            search results.
          </p>
          <h3>Q - What Document/I-Card required to book e-Ticket?</h3>
          <p>
            <strong>Ans. </strong>
            The user is not required to give any input of the photo identity
            card details of any of the passengers while booking the ticket.But
            during the journey, all passengers must carry at least one valid ID,
            like, Aadhar card, driving license, pan card, voter id card.
          </p>
          <h3>Q - How can I make payment to book e-ticket?</h3>
          <p>
            <strong>Ans. </strong>
            All payment options have been grouped under specific categories
            (viz. Credit cards, Net banking, Wallets and Multiple payment
            service etc.) Select the desired Payment Option from the displayed
            Payment gateway menus. Click on "Make Payment" button for
            redirection to selected Bank website.
          </p>
          <h3>Q - How can I cancel e-ticket and how will I get refund?</h3>
          <p>
            <strong>Ans. </strong>To cancel your e-ticket log on to
            www.bookyourjourney.com and go to My Account -> My Transactions ->
            Booked Ticket History and select the ticket to be cancelled and then
            click "Cancel Ticket" Cancellation would be confirmed online and the
            refund would be credited back to the account used for booking as for
            normal Internet tickets.
          </p>
          <h3>Q - What if I forget to carry Photo Identity card?</h3>
          <p>
            <strong>Ans. </strong>
            One of the passenger booked on an E-ticket in a PNR is required to
            present any of the identity cards said above in original during the
            train journey and same will be accepted as a proof of identity
            failing which the passenger will be treated as travelling without
            ticket and shall be dealt as per extant Railway Rules.
          </p>
          <h3>Q - How to postpone/prepone journey?</h3>
          <p>
            <strong>Ans. </strong>
            This can be done on line by cancelling the original ticket and
            booking a fresh ticket.
          </p>
        </div>
        <div id="contact">
          <img src="" alt="" />
          <a href="cfd">Facebook &emsp; &emsp;</a>
          <img src="" alt="" />
          <a href="scs">Twitter</a>
        </div>
        <div id="footer">
          <p>No Copyrights - www.bookyourjourney.com. No Rights Reserved</p>
          <p>Designed and Hosted by Sanjay Majhi</p>
        </div>
      </div>
    );
  }
}

export default Home;
