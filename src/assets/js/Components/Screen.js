import React, {Component} from "react";
import PropTypes from "prop-types";
import AppContext from "../Decorators/AppContext";

@AppContext
export default class Screen extends Component {
    static defaultProps = {
        name: ''
    };

    static propTypes = {
        name: PropTypes.string
    };

    render() {
        return (
            <div className={`Screen ${this.props.name}`}>
                {this.props.children}
            </div>
        );
    }
}
