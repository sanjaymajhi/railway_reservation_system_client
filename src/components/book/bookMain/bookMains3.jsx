import React, { Component } from "react";
class Bookmains3 extends Component {
  constructor(props) {
    super(props);

    this.fetchPayment();
  }

  fetchPayment = () => {
    const data = this.props.state;
    const user = data.user;
    const ticket = {
      train_name: data.train_name,
      train_no: data.train_no,
      teir: data.teir,
      count: data.count,
      src_stn: data.src_stn._id,
      des_stn: data.des_stn._id,
      depart_date: data.depart_date,
      arrival_date: data.arrival_date,
      passengers: data.passengers,
      cost: data.cost,
      user: user._id,
      paymentId: "",
      available_seats: data.availability.seats,
      status: data.availability.status
    };
    var fetchPay = setInterval(async () => {
      await fetch("/invoices/" + data.paymentId, {
        method: "get",
        headers: {
          authorization:
            "Basic "
        }
      })
        .then(res => res.json())
        .then(fetched => {
          if (fetched.payment_id !== null) {
            ticket.paymentId = fetched.payment_id;
            console.log(ticket);
            fetch("/booking/ticket/", {
              method: "POST",
              body: JSON.stringify({ ...ticket }),
              headers: {
                "content-type": "application/json"
              }
            })
              .then(res => res.json())
              .then(data => console.log(data.status));
            clearInterval(fetchPay);
          }
        });
    }, 5000);
  };

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default Bookmains3;
