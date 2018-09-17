import React, {Component} from "react";
import PropTypes from "prop-types";

export default class LoadingOverlay extends Component {
    static defaultProps = {
        loading: false
    };

    static propTypes = {
        loading: PropTypes.bool
    };

    render() {
        if (!this.props.loading) {
            return null;
        }

        return (
            <div className="Loading">
                <div>Loading...</div>
            </div>
        );
    }
}
