import React, { Component } from "react";
class Searchresults extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const train = this.props.train;
    const route = this.props.route;
    return (
      <React.Fragment>
        <div id="train-name">
          <div>
            {train.name}({train.train_no})
          </div>
          <div>
            {route.src_stn.name}->{route.des_stn.name}
          </div>
          <div>Departs on : {train.departing_days.map(day => day + ", ")}</div>
        </div>
        <div id="train-timing">
          <div>{new Date(train.depart_time).toLocaleTimeString()}</div>
          <div>{new Date(train.arrival_time).toLocaleTimeString()}</div>
          <div>17 hours</div>
        </div>
        <select name="select-teir" id="select-teir">
          {train.available_tiers.map(teir => (
            <option key={teir} value="teir">
              {teir}
            </option>
          ))}
        </select>
        <button id="availability">Check availability and fare</button>
      </React.Fragment>
    );
  }
}

export default Searchresults;
