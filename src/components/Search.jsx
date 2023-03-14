import React, { Component } from "react";
import DataContext from "./contextData";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      searchData: [],
      msg: "",
    };
  }
  // context state
  static contextType = DataContext;
  // searching todo .
  SearchHandler = (e) => {
    let temp = [];
    this.setState({ input: e.target.value });
    let input = this.state.input.toLowerCase();
    if (e.target.value.length >= 2) {
      JSON.parse(localStorage.getItem("TodoData")).forEach((element) => {
        let todo1 = element.todo.toLowerCase();
        if (todo1.match(input)) {
          temp.push(element);
          this.setState({ searchData: temp });
        } else {
          this.setState({ searchData: [], msg: "result Not found" });
        }
      });
    } else if (e.target.value.length === 0) {
      this.setState({ searchData: [], msg: "" });
    }
  };
  render() {
    return (
      <div>
        <div class="input-group mb-3 w-100">
          <input
            type="text"
            class="form-control"
            placeholder="search your todo"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={this.SearchHandler}
          />
        </div>
        <div>
          {this.state.msg.length === 0 ? "" : this.state.msg}
          {this.state.searchData.map((item) => (
            <li className="landing__list">{item.todo}</li>
          ))}
        </div>
        <hr />
      </div>
    );
  }
}
