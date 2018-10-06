import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import io from "socket.io-client";
import LoginScreen from "../Screens/LoginScreen";
import LobbyScreen from "../Screens/LobbyScreen";
import Context from "../Context/App";
import ToggleSocketEvents from "../app/Functions/ToggleSocketEvents";

@withRouter
export default class App extends Component {
    socketEvents = {
        'connected': async user => {
            await this.setState({user, connected: true});
            this.props.history.push('/lobby');
        },
        'disconnect': () => {
            this.props.history.push('/');
            this.disconnect();
        }
    };

    state = {
        loading: true,
        connected: false,
        game: null,
        arena: null,
        floor: 1,
        user: null,
        socket: null
    };

    getContext() {
        return {
            loading: this.state.loading,
            connected: this.state.connected,
            game: this.state.game,
            arena: this.state.arena,
            floor: this.state.floor,
            user: this.state.user,
            socket: this.state.socket,
            connect: this.connect,
            disconnect: this.disconnect,
            changeFloor: this.changeFloor,
            emit: this.emit
        };
    }

    emit = (event, data = {}) => {
        data.user = this.state.user;
        this.state.socket.emit(event, data);
    };

    changeFloor = floor => {
        this.setState({floor});
    };

    connect = user => {
        const socket = io.connect('http://localhost:3000', {query: {user: JSON.stringify(user)}});
        ToggleSocketEvents(socket, this.socketEvents, 'on');
        this.setState({socket});
    };

    disconnect = () => {
        this.state.socket.disconnect();
        ToggleSocketEvents(this.state.socket, this.socketEvents, 'off');
        this.setState({connected: false, socket: null});
    };

    componentDidMount() {
        if (this.props.location.pathname !== '/') {
            this.props.history.push('/');
        }
        this.setState({loading: false});
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
                </Switch>
            </Context.Provider>
        );
    }
}
