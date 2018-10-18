import {Component} from "react";

export default class SubscriptionComponent extends Component {
    subscriptions = {};

    openSubscriptions(subscriptions) {
        for (let subscription in subscriptions) {
            if (!subscriptions.hasOwnProperty(subscription)) {
                continue;
            }
            this.props.context.socket.on(subscription, subscriptions[subscription]);
        }
    }

    closeSubscriptions() {
        for (let subscription in this.subscriptions) {
            if (!this.subscriptions.hasOwnProperty(subscription)) {
                continue;
            }
            this.props.context.socket.close(subscription, this.subscriptions[subscription]);
        }
    }

    componentWillUnmount() {
        this.closeSubscriptions();
    }
}
