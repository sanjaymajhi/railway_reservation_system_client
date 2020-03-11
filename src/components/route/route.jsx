import React, { Component } from "react";
class T_Route extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  countHandler = e => {
    let select_div = document.getElementById("select_div");
    select_div.innerHTML = "";
    const value = e.target.value;
    for (let i = 0; i < value; i++) {
      let label = document.createElement("label");
      label.htmlFor = "station" + i.toString();
      label.innerHTML = "Station " + (i + 1).toString() + ": ";
      let select = document.createElement("select");
      select.name = select.id = "station" + i.toString();
      select_div.appendChild(label);
      select_div.appendChild(select);
    }
  };

  render() {
    return (
      <div>
        <h1>Route Create : </h1>
        <form action="" id="form">
          <label htmlFor="count">No. of stations : </label>
          <input type="number" name="count" onChange={this.countHandler} />
          <div id="select_div"></div>
        </form>
      </div>
    );
  }
}

export default T_Route;
