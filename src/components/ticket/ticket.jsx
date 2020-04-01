import React, { Component } from "react";
import index from "../../images/index.jpeg";
import book from "../../images/book.jpg";
import completed from "../../images/completed.jpg";

class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentObject: Object
    };
    this.ticketStatus(this.props.location.state.data.paymentId);
  }

  ticketStatus = pId => {
    fetch("/invoices?type=link&payment_id=" + pId, {
      method: "get",
      headers: {
        authorization:
          "Basic cnpwX3Rlc3Rfa0hiVWVmN1diTVJJQ3M6dUF1UHRRRExBbXN3aEZHb0NDYklCdWZz"
      }
    })
      .then(res => res.json())
      .then(async data =>
        data.items === undefined
          ? await this.setState({ paymentObject: "" })
          : await this.setState({ paymentObject: data.items[0] })
      );
  };

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
              document.getElementById("cancel-confirm").innerHTML = "";
              const div = document.getElementById("ticket-page");
              const h2 = document.createElement("h2");
              h2.innerHTML =
                "we have initiated your refund. Refund Id : " +
                data.id +
                "<br/>current status of your refund : " +
                data.status;
              div.appendChild(h2);
            });
        }
      });
  };
  render() {
    console.log(this.state.paymentObject);
    const data = this.props.location.state.data;
    let count = 0;
    return (
      <div id="ticket-page">
        <h1>Ticket Details</h1>
        {this.state.paymentObject === "" ? (
          <img src={index} alt="cancelled" />
        ) : new Date(data.arrival_date) < new Date() ? (
          <img src={completed} alt="completed" />
        ) : (
          <img src={book} alt="booked" />
        )}
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
        <div> {data.cost.$numberDecimal}</div>
        <div>Payment Id</div>
        <div>:</div>
        <div>
          {" "}
          {this.state.paymentObject === ""
            ? "Refunded"
            : this.state.paymentObject.payment_id}
        </div>
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
        {this.state.paymentObject === "" ? (
          ""
        ) : new Date(data.arrival_date) < new Date() ? (
          ""
        ) : (
          <button id="cancel" onClick={this.cancelHandler}>
            Cancel ticket
          </button>
        )}

        <div></div>
        <div id="cancel-confirm">
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
