import React, { Component } from "react";
import Searchsidenav from "./searchSideNav";
import Searchresults from "./searchResults";
import Searchheader from "./searchHeader";
class Search extends Component {
  render() {
    return (
      <div id="train-search-page">
        <div id="train-side-nav">
          <Searchsidenav />
        </div>
        <div id="train-main">
          <div id="train-header">
            <Searchheader
              count={this.props.location.state.trains.length}
              src_stn={this.props.location.state.route_detail.src_stn.name}
              des_stn={this.props.location.state.route_detail.des_stn.name}
              date={this.props.location.state.date}
            />
          </div>
          {this.props.location.state.trains.map(train => (
            <div key={train._id} className="train-search-results">
              <Searchresults
                train={train}
                route={this.props.location.state.route_detail}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
