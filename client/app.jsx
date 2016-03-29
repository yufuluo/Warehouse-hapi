import React from "react";
import ReactDOM from "react-dom";

import { ItemBox } from "./components/item-box.jsx";

//import "./styles/base.styl";

const rootEl = document.querySelector("#storage");

React.render(
  <ItemBox url="storage"/>,
  rootEl
);
