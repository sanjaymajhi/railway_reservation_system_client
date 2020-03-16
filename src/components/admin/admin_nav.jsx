import React, { Component } from "react";
import { Link } from "react-router-dom";
class Anav extends Component {
  shouldComponentUpdate() {
    return false;
  }

  navUnhide = id => {
    if (document.getElementById(id).style.display === "block") {
      document.getElementById(id).style.display = "none";
    } else {
      document.getElementById(id).style.display = "block";
    }
  };
  render() {
    console.log("inside admin nav");
    return (
      <div className="a_nav">
        <ul>
          <h2 onClick={() => this.navUnhide("nav-hide1")}>Create</h2>
          <hr />
          <div id="nav-hide1" style={{ display: "none" }}>
            <Link to="/admin/train/create">
              <li>Create Train</li>
            </Link>
            <Link to="/admin/route/create">
              <li>Create Route</li>
            </Link>
            <Link to="/admin/station/create">
              <li>Create Station</li>
            </Link>
          </div>
          <h2 onClick={() => this.navUnhide("nav-hide2")}>Search</h2>
          <hr />
          <div id="nav-hide2" style={{ display: "none" }}>
            <Link>
              <li>Search Train</li>
            </Link>
            <Link>
              <li>Search Route</li>
            </Link>
            <Link>
              <li>Search Station</li>
            </Link>
          </div>
          <h2 onClick={() => this.navUnhide("nav-hide3")}>Update</h2>
          <hr />
          <div id="nav-hide3" style={{ display: "none" }}>
            <Link>
              <li>Update Train</li>
            </Link>
            <Link>
              <li>Update Route</li>
            </Link>
            <Link>
              <li>Update Station</li>
            </Link>
          </div>
          <h2 onClick={() => this.navUnhide("nav-hide4")}>Delete</h2>
          <hr />
          <div id="nav-hide4" style={{ display: "none" }}>
            <Link>
              <li>Delete Train</li>
            </Link>
            <Link>
              <li>Delete Route</li>
            </Link>
            <Link>
              <li>Delete Station</li>
            </Link>
          </div>
        </ul>
      </div>
    );
  }
}

export default Anav;
