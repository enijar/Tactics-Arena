import React, {Component} from "react";
import PropTypes from "prop-types";

export default class Message extends Component {
    static propTypes = {
        message: PropTypes.object.isRequired
    };

    render() {
        const {message} = this.props;

        return (
            <div className="Chat__message">
                <div className={`Chat__message-user Chat__message-user--${message.user.type}`}>
                    {message.user.name}&nbsp;:&nbsp;
                </div>
                <div className="Chat__message-message">
                    {message.message}
                </div>
            </div>
        );
    }
}
