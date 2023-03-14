import React, { Component } from "react";
import UserContext from "./components/contextData";
import Landing from "./components/Landing";
import "./App.css";
import { toggleContext } from "./components/contextData";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todo: [],
      loader: true,
      class: "",
      toggle: "",
    };
  }
  render() {
    return (
      <div className="App">
        <UserContext.Provider value={this.state}>
          <toggleContext.Provider value={this.state}>
            <Landing />
          </toggleContext.Provider>
        </UserContext.Provider>
      </div>
    );
  }
}
