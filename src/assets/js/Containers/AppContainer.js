import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import App from "../Components/App";
import Context from "../Context/App";
import config from "../config";

export default class AppContainer extends Component {
    state = {
        game: null,
        arena: null,
        floor: 1,
        position: null
    };

    getContext() {
        return {
            game: this.state.game,
            arena: this.state.arena,
            floor: this.state.floor,
            changeFloor: this.changeFloor,
            setAvatar: this.setAvatar
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
