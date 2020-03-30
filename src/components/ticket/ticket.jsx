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
    let count = 0;
    return (
      <div id="ticket-page">
        <h1 style={{ gridColumn: "span 3" }}>Ticket Details</h1>
        <div>PNR no. </div>
        <div>:</div>
        <div> {data._id}</div>
        <div>Booked by </div>
        <div>:</div>
        <div> {data.user.f_name + " " + data.user.l_name}</div>
        <div>Train Name </div>
        <div>:</div>
        <div> {data.train_name}</div>
        <div>Train No. </div>
        <div>:</div>
        <div> {data.train_no}</div>
        <div>Teir : </div>
        <div>:</div>
        <div> {data.teir}</div>
        <div>Passenger Count </div>
        <div>:</div>
        <div> {data.count}</div>
        <div>Source Station </div>
        <div>:</div>
        <div> {data.src_stn.name}</div>
        <div>Destination Station </div>
        <div>:</div>
        <div> {data.des_stn.name}</div>
        <div>Departure Time </div>
        <div>:</div>
        <div> {new Date(data.depart_date).toLocaleString()}</div>
        <div>Arrival Time </div>
        <div>:</div>
        <div> {new Date(data.arrival_date).toLocaleString()}</div>
        <div>Ticket Price </div>
        <div>:</div>
        <div> {data.cost}</div>
        <div>Payment Id</div>
        <div>:</div>
        <div> {data.paymentId}</div>
        <div style={{ gridColumn: "span 3" }}>
          <div
            style={{
              fontWeight: "bold",
              borderBottom: "1px solid lightgray",
              textAlign: "center"
            }}
          >
            Passenger Details
          </div>
          <table>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Food</th>
              </tr>
            </thead>
            <tbody>
              {data.passengers.map(passenger => (
                <tr key={count++}>
                  <td>{count}</td>
                  <td>{passenger.name}</td>
                  <td>{passenger.gender}</td>
                  <td>{passenger.age}</td>
                  <td>{passenger.food}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
