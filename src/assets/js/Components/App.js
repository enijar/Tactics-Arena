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

    wss = {
        send: (event, data = null) => {
            const payload = {
                player: this.state.player,
                data,
            };

            return this.state.socket.send(event, payload);
        },
        on: (event, callback) => {
            return this.state.socket.on(event, callback);
        },
        subscribe: channel => {
            return this.state.socket.subscribe(channel);
        },
        close: channel => {
            return this.state.socket.close(channel);
        },
    };

    getContext() {
        return {
            loading: this.state.loading,
            connected: this.state.connected,
            floor: this.state.floor,
            player: this.state.player,
            subscriptions: this.state.subscriptions,
            wss: this.wss,
            connect: this.connect,
            disconnect: this.disconnect,
            changeFloor: this.changeFloor,
            addSubscription: this.addSubscription,
            removeSubscription: this.removeSubscription,
        };
    }

    addSubscription = (channel, callback) => {
        const {subscriptions} = this.state;
        const subscription = this.wss.subscribe(channel);
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
        const {common} = config;
        const {protocol, host, port} = common.socket;

        const socket = new ClusterWS({
            url: `${protocol}://${host}${port !== null ? `:${port}` : ''}/${encodeURI(JSON.stringify(player))}`,
        });

        await this.setState({socket});

        this.wss.on('connect', () => {
            this.wss.send('connect', player);

            this.wss.on('connected', async player => {
                await this.setState({connected: true, player});
                this.props.history.push('/lobby');
            });
        });

        this.wss.on('disconnect', this.disconnect);
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
            this.state.connected && this.wss.send('player.activity');
        });

        window.addEventListener('keydown', () => {
            this.state.connected && this.wss.send('player.activity');
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
