import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import AppContainer from "./Containers/AppContainer";

render(<AppContainer/>, document.querySelector('#root'));
