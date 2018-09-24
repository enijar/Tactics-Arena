import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import App from "../Components/App";
import Context from "../Context/App";
import config from "../config";
import Socket from "../app/Socket";

export default class AppContainer extends Component {
    state = {
        game: null,
        arena: null,
        floor: 1,
        position: null,
        socket: null,
        user: {
            id: 1,
            username: 'Enijar'
        }
    };

    getContext() {
        return {
            game: this.state.game,
            arena: this.state.arena,
            floor: this.state.floor,
            user: this.state.user,
            socket: this.state.socket,
            changeFloor: this.changeFloor,
            setAvatar: this.setAvatar,
            connect: this.connect,
            disconnect: this.disconnect
        };
    }

    changeFloor = floor => {
        this.setState({floor});
    };

    setAvatar = (arena, position) => {
        this.setState({
            game: ((this.state.floor - 1) * config.arenas) + arena,
            arena,
            position
        });
    };

    connect = () => {
        this.setState({socket: Socket.connect()});
    };

    disconnect = () => {
        this.setState({socket: Socket.disconnect()});
    };

    render() {
        return (
            <Context.Provider value={this.getContext()}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Context.Provider>
        );
    }
}
