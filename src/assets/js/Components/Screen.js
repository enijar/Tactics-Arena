import React, {Component} from "react";
import AppContext from "../Decorators/AppContext";

@AppContext
export default class Screen extends Component {
    render() {
        return (
            <div className="Screen">
                {this.props.children}
            </div>
        );
    }
}
