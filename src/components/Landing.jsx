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
  static contextType = UserContext;
  componentDidMount() {
    const data = this.context;
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((val) => {
        console.log(val);
        this.context.todo = val.todos;
        this.setState({ getApiData: data.todo });
        if (JSON.parse(localStorage.getItem("TodoData")) !== null) {
          let v1 = JSON.parse(localStorage.getItem("TodoData"));
          localStorage.setItem("TodoData", JSON.stringify(v1));
        } else {
          localStorage.setItem("TodoData", JSON.stringify(this.context.todo));
        }
        data.loader = false;
      });
  }
  InputHandler = (e) => {
    this.setState({ input: e.target.value });
  };
  CreateHandler = () => {
    console.log(this.context.todo);
    var obj = {
      todo: this.state.input,
    };
    this.context.todo.push(obj);
    this.setState({ getApiData: this.context.todo });
    localStorage.setItem("TodoData", JSON.stringify(this.context.todo));
  };
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
    const data = this.context;
    return (
      <div className={`${this.context.class}`}>
        <div className="landingpage">
          <div style={{ marginLeft: "4%" }}>
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
          <div class="input-group mb-3 w-100">
            <input
              type="text"
              class="form-control"
              placeholder="Craete new todo"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={this.InputHandler}
            />
            <button className="btn btn-primary" onClick={this.CreateHandler}>
              create todo
            </button>
          </div>
          <Search />
          <div className="landing mt-3 p-5">
            <h3>Todo list</h3>
            <div className="landing__list">
              {data.loader === true ? (
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                JSON.parse(localStorage.getItem("TodoData")).map((item) => (
                  <li className="landing__list">{item.todo}</li>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
