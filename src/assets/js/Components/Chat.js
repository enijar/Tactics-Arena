import React, {Component, createRef} from "react";
import AppContext from "../Decorators/AppContext";

@AppContext
export default class Chat extends Component {
    messages = createRef();

    state = {
        messages: [],
        message: '',
        scrollToBottom: true
    };

    async componentDidMount() {
        const {messages} = this.state;

        for (let i = 0; i < 20; i++) {
            messages.push({
                id: i + 1,
                text: `Message ${i + 1}`,
                time: '23:11',
                user: {
                    id: 1,
                    username: 'Enijar'
                }
            });
        }

        await this.setState({messages});
        this.scrollToBottom();
    }

    handleSubmit = async event => {
        event.preventDefault();

        const message = this.state.message.trim();

        if (message.length === 0) {
            return;
        }

        const {messages} = this.state;

        messages.push({
            id: messages.length + 1,
            text: message,
            time: '23:11',
            user: {
                id: 1,
                username: 'Enijar'
            }
        });

        await this.setState({messages, message: ''});
        this.scrollToBottom();
    };

    handleChange = event => {
        this.setState({message: event.target.value});
    };

    scrollToBottom() {
        if (this.state.scrollToBottom) {
            this.messages.current.scrollTop = this.messages.current.scrollHeight - this.messages.current.clientHeight;
        }
    }

    handleScroll = event => {
        const scrollToBottom = event.target.scrollTop === this.messages.current.scrollHeight - this.messages.current.clientHeight;
        this.setState({scrollToBottom});
    };

    render() {
        return (
            <div className="Chat">
                <div className="Chat__messages" ref={this.messages} onScroll={this.handleScroll}>
                    {this.state.messages.map(message => (
                        <div className="Chat__message" key={message.id}>
                            <time className="Chat__message-time">
                                {message.time}
                            </time>
                            <div className="Chat__message-user">
                                {message.user.username}
                            </div>
                            <div className="Chat__message-text">
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="Chat__input">
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <input
                            name="message"
                            placeholder="Enter your message..."
                            onChange={this.handleChange}
                            value={this.state.message}
                        />
                    </form>
                </div>
            </div>
        );
    }
}
