import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import App from "../Components/App";

export default class AppContainer extends Component {
    render() {
        return (
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        );
    }
}
