import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import LoginScreen from "../Screens/LoginScreen";
import LobbyScreen from "../Screens/LobbyScreen";
import AppContext from "../Decorators/AppContext";

@AppContext
export default class App extends Component {
    componentDidMount() {
        this.props.context.socket.on('connection', () => {
            console.info('Connected to sockets');
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={LoginScreen}/>
                <Route exact path="/lobby" component={LobbyScreen}/>
            </Switch>
        );
    }
}
