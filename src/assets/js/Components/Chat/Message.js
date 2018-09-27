import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

export default class Message extends Component {
    static propTypes = {
        message: PropTypes.object.isRequired
    };

    render() {
        const {message} = this.props;
        const multiLineMessage = message.text.split(/\n/);

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
                    {multiLineMessage.map((line, index) => (
                        <Fragment key={index}>
                            {line}
                            {index !== 0 && index !== multiLineMessage.length - 1 ? <br/> : null}
                        </Fragment>
                    ))}
                </div>
            </div>
        );
    }
}
