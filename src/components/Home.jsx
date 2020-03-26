import React, { Component } from "react";
import moment from "moment";

import Buddha from "../images/Buddha.png";
import exterior from "../images/exterior.jpg";
import imgad from "../images/imgad.jpeg";
import kashmir from "../images/Kashmir.jpg";
import manali from "../images/Manali.jpg";
import thailand from "../images/Thailand.jpg";

import rail_icon from "../images/rail_icon.png";

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

  loadTicket = e => {
    e.preventDefault();
    const form = document.getElementById("find-ticket");
    fetch("/booking/ticket/search/", {
      method: "POST",
      body: JSON.stringify({ pnr: form[0].value }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data =>
        this.props.history.push({
          pathname: "/ticket/",
          search: "",
          state: { ...data }
        })
      );
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
        <div id="search-container">
          <div id="search">
            <form onSubmit={this.submit}>
              <p id="bold">Book your ticket</p>
              <img src={rail_icon} alt="rail icon" />
              <br />
              <br />
              <select
                name="from_stn"
                id="from_stn"
                onChange={this.handleChange}
              >
                <option value="" selected="selected" disabled="disabled">
                  From *
                </option>
              </select>
              <br />
              <br />
              <select name="to_stn" id="to_stn" onChange={this.handleChange}>
                <option value="" disabled="disabled" selected="selected">
                  To *
                </option>
              </select>
              <br />
              <br />
              <input
                type="date"
                name="date"
                min={moment().format("YYYY-MM-DD")}
                max={moment(Date.now())
                  .add(90, "d")
                  .format("YYYY-MM-DD")}
                onChange={this.handleChange}
              />
              <br />
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
          </div>

          <div id="rightofsearch">
            <h1>INDIAN RAILWAYS</h1>
            <h2>Safety Security Punctuality</h2>
          </div>
        </div>
        <div>
          <form onSubmit={this.loadTicket} id="find-ticket">
            <input
              type="text"
              name="pnr"
              id="pnr"
              placeholder="Enter your PNR no."
            />
            <input type="submit" value="Find Ticket" />
          </form>
        </div>
        <div className="ad">
          <h1>Call for advertisement</h1>
        </div>
        <div id="services-container">
          <h1>Have you not found the right one?</h1>
          <h1>Find a service suitable for you here.</h1>
          <div id="services">
            <h3>flights</h3>
            <h3>stays</h3>
            <h3>rail dristhi</h3>
            <h3>e-catering</h3>
            <h3>holiday packages</h3>
            <h3>tourist train</h3>
            <h3>hill railway</h3>
            <h3>chapter train</h3>
            <h3>gallery</h3>
          </div>
        </div>
        <div className="ad">
          <h1>Call for advertisement</h1>
        </div>
        <div id="holidays-container">
          <div>
            <img src={exterior} alt="maharaja express" />
            <h2>Maharaja's Express</h2>
            <p>
              Redefining Royalty, Luxury and Comfort, Maharajas’ express takes
              you on a sojourn to the era of bygone stately splendour of
              princely states.
            </p>
          </div>
          <div>
            <img src={thailand} alt="Thailand" />
            <h2>International Packages</h2>
            <p>
              Best deals in International Holiday packages, handpicked by IRCTC,
              for Thailand, Dubai, Sri Lanka, Hong Kong, China, Macau, Bhutan,
              Nepal, U.K., Europe, USA, Australia etc.
            </p>
          </div>
          <div>
            <img src={manali} alt="Manali" />
            <h2>Domestic Air Packages</h2>
            <p>
              Be it the spiritual devotee seeking blessings of Tirupati, Shirdi
              or Mata Vaishno Devi or the leisure traveller wanting to relish
              the Blue mountains of North East,Serene lakes or Picturesque
              Islands, IRCTC has it all.
            </p>
          </div>
          <div>
            <img src={Buddha} alt="Buddha" />
            <h2>Buddhist Circuit Tourist Train</h2>
            <p>
              India, the country where Buddhism originated has rich memories of
              the Buddhist legacy. As part of its drive towards austerity, the
              only kind of art & architecture that it supported were Stupas,
              Chaityas & Viharas.
            </p>
          </div>
          <div>
            <img src={kashmir} alt="Kashmir valley" />
            <h2>Rail Tour Packages</h2>
            <p>
              IRCTC offers Exclusive Rail tour packages with confirmed train
              tickets, sight-seeing and meals for enchanting Nilgiri Gangtok or
              divine tours of Mata Vaishno Devi, Rameswaram, Madurai, Shirdi,
              Tirupati etc.
            </p>
          </div>
          <div>
            <img id="bottlead" src={imgad} alt="advertisement" />
          </div>
        </div>
        <div id="contact">
          <img src="" alt="" />
          <a href="cfd">Facebook &emsp; &emsp;</a>
          <img src="" alt="" />
          <a href="scs">Twitter</a>
        </div>
        <div id="footer">
          <p>Copyright © 2020 - www.irctc.co.in. All Rights Reserved</p>
          <p>Designed and Hosted by CRIS</p>
        </div>
      </div>
    );
  }
}

export default Home;
