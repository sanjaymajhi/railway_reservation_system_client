import React, { Component } from "react";
class PNR extends Component {
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

  render() {
    return (
      <div>
        <h1>Check PNR status</h1>
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
    );
  }
}

export default PNR;
