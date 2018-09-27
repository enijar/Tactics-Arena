import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import LoginScreen from "../Screens/LoginScreen";
import LobbyScreen from "../Screens/LobbyScreen";
import Context from "../Context/App";
import io from "socket.io-client";
import ToggleSocketEvents from "../app/Functions/ToggleSocketEvents";

@withRouter
export default class App extends Component {
    socketEvents = {
        'disconnect': () => {
            console.log('disconnect');
            this.props.history.push('/');
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
            setUser: this.setUser
        };
    }

    changeFloor = floor => {
        this.setState({floor});
    };

    setUser = user => {
        this.setState({user});
    };

    connect = () => {
        const socket = io();
        ToggleSocketEvents(socket, this.socketEvents, 'on');
        this.setState({socket, connected: true});
    };

    disconnect = () => {
        ToggleSocketEvents(this.state.socket, this.socketEvents, 'off');
        this.setState({socket: null, connected: false});
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
