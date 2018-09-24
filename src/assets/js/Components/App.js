import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import LoginScreen from "../Screens/LoginScreen";
import LobbyScreen from "../Screens/LobbyScreen";
import AppContext from "../Decorators/AppContext";

@AppContext
@withRouter
export default class App extends Component {
    state = {
        loading: true
    };

    componentDidMount() {
        if (!this.props.context.socket && this.props.location.pathname !== '/') {
            this.props.history.push('/');
        }

        this.setState({loading: false});
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        return (
            <Switch>
                <Route exact path="/" component={LoginScreen}/>
                <Route exact path="/lobby" component={LobbyScreen}/>
            </Switch>
        );
    }
}
