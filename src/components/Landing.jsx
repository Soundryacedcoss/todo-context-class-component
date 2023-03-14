import React, { Component } from "react";
import UserContext from "./contextData";
import Search from "./Search";

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      getApiData: "",
      input: "",
      switch: true,
    };
  }
  // acceseing context
  static contextType = UserContext;
  componentDidMount() {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((val) => {
        //  using context state by this.context
        this.context.todo = val.todos;
        this.setState({ getApiData: this.context.todo });
        // checking that todo list is already present in localstorage or not
        if (JSON.parse(localStorage.getItem("TodoData")) !== null) {
          let v1 = JSON.parse(localStorage.getItem("TodoData"));
          localStorage.setItem("TodoData", JSON.stringify(v1));
        } else {
          localStorage.setItem("TodoData", JSON.stringify(this.context.todo));
        }
        // loader
        this.context.loader = false;
      });
  }
  // input box handler
  InputHandler = (e) => {
    this.setState({ input: e.target.value });
  };
  // creating new todo
  CreateHandler = () => {
    // validation
    if (this.state.input === "") {
      alert("Please write todo..");
    } else {
      var obj = {
        todo: this.state.input,
      };
      this.context.todo.push(obj);
      this.setState({ getApiData: this.context.todo, input: "" });
      alert("added");
      localStorage.setItem("TodoData", JSON.stringify(this.context.todo));
    }
  };
  // theme toggler handler
  ToggleHanlder = (e) => {
    this.context.toggle = e.target.checked;
    if (e.target.checked === true) {
      this.context.class = "night";
      this.setState({ switch: "false" });
    } else if (e.target.checked === false) {
      this.context.class = "day";
      this.setState({ switch: "trueqwr" });
    }
  };
  render() {
    return (
      <div className={`${this.context.class}`}>
        <div style={{ marginLeft: "4%" }} className="mt-2">
          <input
            type="checkbox"
            class="checkbox"
            id="checkbox"
            onChange={this.ToggleHanlder}
          />
          <label for="checkbox" class="label">
            <i class="fa fa-moon-o"></i>
            <i class="fa fa-sun-o"></i>
            <div class="ball"></div>
          </label>
        </div>
        <div className="landingpage">
          <div class="input-group mb-3 w-100">
            <input
              type="text"
              class="form-control"
              placeholder="Create new todo"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={this.state.input}
              onChange={this.InputHandler}
            />
            <button className="btn btn-primary" onClick={this.CreateHandler}>
              create todo
            </button>
          </div>
          <Search />
          <div className="landing mt-3 p-5">
            <h3>Todo list</h3>

            {this.context.loader === true ? (
              <center>
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </center>
            ) : (
              JSON.parse(localStorage.getItem("TodoData")).map((item) => (
                <li className="landing__list">{item.todo}</li>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
