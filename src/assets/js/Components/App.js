import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import ClusterWS from "clusterws-client-js";
import LoginScreen from "../Screens/LoginScreen";
import LobbyScreen from "../Screens/LobbyScreen";
import PlayScreen from "../Screens/PlayScreen";
import Context from "../Context/App";
import config from "../config";

@withRouter
export default class App extends Component {
    state = {
        loading: true,
        connected: false,
        socket: null,
        player: null,
        floor: 1,
        subscriptions: {},
    };

    getContext() {
        return {
            loading: this.state.loading,
            connected: this.state.connected,
            socket: this.state.socket,
            floor: this.state.floor,
            player: this.state.player,
            subscriptions: this.state.subscriptions,
            connect: this.connect,
            disconnect: this.disconnect,
            changeFloor: this.changeFloor,
            addSubscription: this.addSubscription,
            removeSubscription: this.removeSubscription,
        };
    }

    addSubscription = (channel, callback) => {
        const {subscriptions} = this.state;
        const subscription = this.state.socket.subscribe(channel);
        subscription.watch(callback);
        subscriptions[channel] = subscription;
        this.setState({subscriptions});
    };

    removeSubscription = channel => {
        const {subscriptions} = this.state;
        subscriptions[channel].unsubscribe();
        delete subscriptions[channel];
        this.setState({subscriptions});
    };

    changeFloor = floor => {
        this.setState({floor});
    };

    connect = async player => {
        const {protocol, host} = window.location;

        const socket = new ClusterWS({
            url: `${/^https/.match(protocol) ? 'wss' : 'ws'}://${host}:${config.common.port}/${encodeURI(JSON.stringify(player))}`,
        });

        await this.setState({socket});

        this.state.socket.on('connect', () => {
            this.state.socket.send('connect', player);

            this.state.socket.on('connected', async player => {
                await this.setState({connected: true, player});
                this.props.history.push('/lobby');
            });
        });

        this.state.socket.on('disconnect', () => this.disconnect());
    };

    disconnect = async () => {
        await this.setState({connected: false, socket: null, player: null});
        this.props.history.push('/');
    };

    async componentDidMount() {
        const {pathname} = this.props.location;
        if (!config.publicRoutes.includes(pathname) && pathname !== '/') {
            this.props.history.push('/');
        }
        await this.setState({loading: false});

        window.addEventListener('mousedown', () => {
            this.state.connected && this.state.socket.send('player.activity', this.state.player);
        });

        window.addEventListener('keydown', () => {
            this.state.connected && this.state.socket.send('player.activity', this.state.player);
        });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <Context.Provider value={this.getContext()}>
                <Switch>
                    <Route exact path="/" component={LoginScreen}/>
                    <Route exact path="/lobby" component={LobbyScreen}/>
                    <Route exact path="/play" component={PlayScreen}/>
                </Switch>
            </Context.Provider>
        );
    }
}
