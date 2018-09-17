import React from "react";
import AppContext from "../Decorators/AppContext";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";

@AppContext
export default class LoginScreen extends BaseScreen {
    handleSubmit = event => {
        event.preventDefault();
        console.info('TODO: LoginScreen -> handle login submit');
    };

    render() {
        return (
            <Screen>
                <h1>Login Screen</h1>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="Username" autoComplete="username"/>
                    <input type="password" name="password" placeholder="Password" autoComplete="current-password"/>
                    <button>Login</button>
                </form>
            </Screen>
        );
    }
}
