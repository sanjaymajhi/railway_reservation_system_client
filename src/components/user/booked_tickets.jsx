import React, { Component } from "react";
import { Link } from "react-router-dom";
class Bookedtickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: []
    };
    this.loadTickets();
  }

  loadTickets = () => {
    fetch("/user/tickets/", {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(async data => {
        await this.setState({ tickets: data.tickets });
      });
  };

  loadTicketDetails = e => {
    e.preventDefault();
    fetch("/booking/ticket/search/", {
      method: "POST",
      body: JSON.stringify({ pnr: e.target.innerHTML }),
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
    let count = 0;
    return (
      <div className="admin-main" style={{ padding: "10px 10px" }}>
        <h2>Booked Tickets</h2>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>PNR No.</th>
              <th>Booked On</th>
              <th>Departure Date</th>
              <th>Payment Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tickets.map(ticket => (
              <tr key={count++}>
                <td>{count}</td>

                <td onClick={this.loadTicketDetails}>
                  {" "}
                  <Link>{ticket._id}</Link>
                </td>

                <td>
                  {new Date(ticket.bookedOn).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </td>
                <td>
                  {new Date(ticket.depart_date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </td>
                <td>{ticket.paymentId.split("cancelled")}</td>
                <td>
                  {ticket.paymentId.split("cancelled")[1] === ""
                    ? "Cancelled"
                    : new Date(ticket.arrival_date) < Date.now()
                    ? "completed"
                    : "active"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Bookedtickets;
