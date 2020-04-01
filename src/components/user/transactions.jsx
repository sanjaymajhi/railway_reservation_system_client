import React, { Component } from "react";
class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      txns: []
    };
  }

  componentDidMount() {
    this.transactionStatus();
  }

  transactionStatus = () => {
    fetch("/user/payment_ids", {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token") }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        data.paymentIds.map(async pId => {
          await fetch("/payments/" + pId.split("cancelled")[0], {
            method: "get",
            headers: {
              authorization:
                "Basic cnpwX3Rlc3Rfa0hiVWVmN1diTVJJQ3M6dUF1UHRRRExBbXN3aEZHb0NDYklCdWZz"
            }
          })
            .then(res => res.json())
            .then(async data => {
              if (data.status === "refunded") {
                await fetch("/payments/" + data.id + "/refunds", {
                  method: "GET",
                  headers: {
                    authorization:
                      "Basic cnpwX3Rlc3Rfa0hiVWVmN1diTVJJQ3M6dUF1UHRRRExBbXN3aEZHb0NDYklCdWZz"
                  }
                })
                  .then(res => res.json())
                  .then(async data1 => {
                    data.refundDate = new Date(
                      data1.items[0].created_at * 1000
                    );
                    data.refundId = data1.items[0].id;
                  });
              } else {
                data.refundId = "-";
                data.refundDate = "";
              }
              let txns = this.state.txns;
              txns.push(data);
              await this.setState({ txns: txns });
            });
        });
      });
  };

  render() {
    let count = 0;
    return (
      <div className="admin-main" style={{ padding: "10px" }}>
        <h2>Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Payment Id</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Refund Id / Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.txns.map(txn => (
              <tr key={count++}>
                <td>{count}</td>
                <td>{txn.id}</td>
                <td>{txn.amount / 100}</td>
                <td>{new Date(txn.created_at * 1000).toLocaleString()}</td>
                <td>{txn.method}</td>
                <td>{txn.status}</td>
                <td>
                  <div>
                    <strong>{txn.refundId}</strong>
                  </div>
                  <br />
                  <div>
                    {txn.refundDate === ""
                      ? ""
                      : new Date(txn.refundDate).toLocaleDateString("en-Us", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Transactions;
