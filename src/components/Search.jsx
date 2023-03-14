import React, { Component } from "react";
import DataContext from "./contextData";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      searchData: [],
    };
  }
  static contextType = DataContext;
  InputHandler = (e) => {
    this.setState({ input: e.target.value });
  };
  SearchHandler = () => {
    let temp = [];
    let input = this.state.input.toLowerCase();
    console.log(input);
    JSON.parse(localStorage.getItem("TodoData")).forEach((element) => {
      let todo1 = element.todo.toLowerCase();
      if (todo1.match(input)) {
        console.log(element);
        temp.push(element);
        this.setState({ searchData: temp });
      }
    });
    console.log(this.context.searchData);
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
            onChange={this.InputHandler}
          />
          <button className="btn btn-primary" onClick={this.SearchHandler}>
            search todo
          </button>
        </div>
        {this.state.searchData.length !== 0 ? <h2>Search result</h2> : ""}
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
