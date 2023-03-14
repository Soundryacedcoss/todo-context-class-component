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
          console.log("if");
          temp.push(element);
          console.log(temp);
          this.setState({ searchData: temp, msg: "" });
        } else {
          this.setState({ searchData: temp, msg: "not found" });
        }
      });
    } else if (e.target.value.length === 0) {
      this.setState({ searchData: [] });
    }
  };
  render() {
    console.log(
      "search",
      this.state.searchData.length,
      "input",
      this.state.input,
      "msg",
      this.state.msg
    );
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
          {this.state.searchData.map((item) => (
            <li className="landing__list">{item.todo}</li>
          ))}
        </div>
        <hr />
      </div>
    );
  }
}
