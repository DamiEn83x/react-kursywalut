import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import BodyApp from "./src/Body/Body";

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
        <BodyApp />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
