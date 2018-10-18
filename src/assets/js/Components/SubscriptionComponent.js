import {Component} from "react";

export default class SubscriptionComponent extends Component {
    events = {};
    subscriptions = {};

    openEvents(events) {
        for (let event in events) {
            if (!events.hasOwnProperty(event)) {
                continue;
            }
            this.props.context.socket.on(event, events[event]);
        }
    }

    openSubscriptions(subscriptions) {
        for (let channel in subscriptions) {
            if (!subscriptions.hasOwnProperty(channel)) {
                continue;
            }
            this.props.context.addSubscription(channel, subscriptions[channel]);
        }
    }

    closeEvents() {
        for (let event in this.events) {
            if (!this.events.hasOwnProperty(event)) {
                continue;
            }
            this.props.context.socket.close(event, this.events[event]);
        }
    }

    closeSubscriptions() {
        for (let channel in this.subscriptions) {
            if (!this.subscriptions.hasOwnProperty(channel)) {
                continue;
            }
            this.props.context.removeSubscription(channel, this.subscriptions[channel]);
        }
    }

    componentWillUnmount() {
        this.closeEvents();
        this.closeSubscriptions();
    }
}
