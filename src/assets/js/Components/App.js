import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import LoginScreen from "../Screens/LoginScreen";
import LobbyScreen from "../Screens/LobbyScreen";

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={LoginScreen}/>
                <Route exact path="/lobby" component={LobbyScreen}/>
            </Switch>
        );
    }
}
