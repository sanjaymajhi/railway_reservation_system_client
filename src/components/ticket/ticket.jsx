import React, { Component } from "react";
class Ticket extends Component {
  cancelHandler = () => {
    const button = document.getElementById("cancel");
    const div = document.getElementById("cancel-confirm");
    button.remove();
    div.style.display = "block";
  };
  cancelConfirmHandler = async () => {
    await fetch("/booking/ticket/cancel", {
      method: "POST",
      body: JSON.stringify({ id: this.props.location.state.data._id }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.cancelled === "success") {
          console.log(data);
          fetch(
            "/payments/" + this.props.location.state.data.paymentId + "/refund",
            {
              method: "POST",
              body: JSON.stringify({}),
              headers: {
                "content-type": "application/json",
                authorization:
                  "Basic cnpwX3Rlc3Rfa0hiVWVmN1diTVJJQ3M6dUF1UHRRRExBbXN3aEZHb0NDYklCdWZz"
              }
            }
          )
            .then(res => res.json())
            .then(data => {
              const div = document.getElementById("ticket-page");
              const h2 = document.createElement("h2");
              h2.innerHTML =
                "we have initiated your refund. Refund Id : " +
                data.id +
                "<br/>current status of your refund : " +
                data.status;
              div.style.gridColumn = "span 2";
              div.appendChild(h2);
            });
        }
      });
  };
  render() {
    const data = this.props.location.state.data;
    return (
      <div id="ticket-page">
        <div>PNR no. </div>
        <div>: {data._id}</div>
        <div>Booked by </div>
        <div>: {data.user.f_name + " " + data.user.l_name}</div>
        <div>Train Name </div>
        <div>: {data.train_name}</div>
        <div>Train No. </div>
        <div>: {data.train_no}</div>
        <div>Teir : </div>
        <div>: {data.teir}</div>
        <div>Passenger Count </div>
        <div>: {data.count}</div>
        <div>Source Station </div>
        <div>: {data.src_stn.name}</div>
        <div>Destination Station </div>
        <div>: {data.des_stn.name}</div>
        <div>Departure Time </div>
        <div>: {new Date(data.depart_date).toLocaleString()}</div>
        <div>Arrival Time </div>
        <div>: {new Date(data.arrival_date).toLocaleString()}</div>
        <div>Ticket Price </div>
        <div>: {data.cost}</div>
        <div>Payment Id</div>
        <div>: {data.paymentId}</div>
        <div>
          <div>Passengers</div>
          {data.passengers.map(passenger => (
            <div>
              {passenger.name +
                ", " +
                passenger.gender +
                ", " +
                passenger.age +
                ", " +
                passenger.food}
            </div>
          ))}
        </div>
        <div></div>
        <button id="cancel" onClick={this.cancelHandler}>
          Cancel ticket
        </button>
        <div
          id="cancel-confirm"
          style={{ display: "none", gridColumn: "span 2" }}
        >
          <p>
            Refund will be possessed to original source of payment within 5-7
            days.
          </p>
          <button onClick={this.cancelConfirmHandler}>Confirm</button>
        </div>
      </div>
    );
  }
}

export default Ticket;
