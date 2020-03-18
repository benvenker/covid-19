import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Summary from "./components/Summary";
import Country from "./components/Country";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Summary}></Route>
      <Route
        path="/country/:slug"
        render={props => <Country {...props} />}
      ></Route>
    </div>
  );
}

export default App;
