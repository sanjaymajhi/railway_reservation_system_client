import React, { Component } from "react";
class Train extends Component {
  render() {
    return (
      <div>
        <h1>Add Trains Page </h1>
        <form id="form" action="">
          <label htmlFor="name">Name : </label>
          <input type="text" name="name" id="train_name" />
          <label htmlFor="train_no">Train No : </label>
          <input type="number" name="train_no" id="train_no" />
          <label htmlFor="available_tiers">Available Tiers : </label>
          <div>
            <input
              type="checkbox"
              name="available_tiers"
              id="available_tiers"
              value="1A"
            />
            1A
            <input
              type="checkbox"
              name="available_tiers"
              id="available_tiers"
              value="2A"
            />
            2A
            <input
              type="checkbox"
              name="available_tiers"
              id="available_tiers"
              value="3A"
            />
            3A
            <input
              type="checkbox"
              name="available_tiers"
              id="available_tiers"
              value="SL"
            />
            SL
            <input
              type="checkbox"
              name="available_tiers"
              id="available_tiers"
              value="CC"
            />
            CC
          </div>
          <label htmlFor="departing_days">Select departing days : </label>
          <div>
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="mon"
            />
            Monday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="tue"
            />
            Tuesday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="wed"
            />
            Wednesday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="thu"
            />
            Thursday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="fri"
            />
            Friday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="sat"
            />
            Saturday
            <br />
            <input
              type="checkbox"
              name="departing_days"
              id="departing_days"
              value="sun"
            />
            Sunday
            <br />
          </div>
          <label htmlFor="route">Select Route</label>
          <select name="route" id="route">
            <option value=""></option>
          </select>
          <label htmlFor="depart_time">departure time : </label>
          <input type="time" name="depart_time" id="depart_time" />
          <label htmlFor="arrival_time">arrival time : </label>
          <input type="time" name="arrival_time" id="arrival_time" />
          <label htmlFor="coach_seats">coach seats : </label>
          <input type="number" name="coach_seats" id="coach_seats" />
          <label htmlFor="total_seats">total_seats : </label>
          <input type="number" name="total_seats" id="total_seats" />
          <label htmlFor="ticket_cost">Ticket Cost : </label>
          <input type="number" name="ticket_cost" id="ticket_cost" />
          <div />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default Train;
