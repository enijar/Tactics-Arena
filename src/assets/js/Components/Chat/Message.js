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
                <time className="Chat__message-time">
                    {message.time}
                </time>
                {message.type === 'user' && (
                    <div className="Chat__message-user">
                        {message.user.name}
                    </div>
                )}
                <div className="Chat__message-text">
                    {message.message}
                </div>
            </div>
        );
    }
}
