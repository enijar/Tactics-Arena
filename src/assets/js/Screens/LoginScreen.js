import React from "react";
import AppContext from "../Decorators/AppContext";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import Request from "../app/Request";

@AppContext
export default class LoginScreen extends BaseScreen {
    state = {
        registrationForm: false,
        data: {
            name: '',
            password: '',
            passwordConfirm: ''
        }
    };

    handleSubmit = async event => {
        event.preventDefault();

        const res = await Request.post(`/api/${this.state.registrationForm ? 'register' : 'login'}`, this.state.data);
        console.log(res);
    };

    handleChange = event => {
        const {data} = this.state;
        data[event.target.name] = event.target.value;
        this.setState({data});
    };

    toggleRegistrationForm = () => {
        this.setState({registrationForm: !this.state.registrationForm});
    };

    render() {
        return (
            <Screen name="LoginScreen">
                <form
                    onSubmit={this.handleSubmit}
                    className={`LoginScreen__form ${this.state.registrationForm ? 'LoginScreen__form--registration' : ''}`}
                >
                    <div className="LoginScreen__form-field">
                        <label htmlFor="name">Name</label>
                        <input
                            maxLength={15}
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="current-username"
                            tabIndex={1}
                            value={this.state.data.name}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="LoginScreen__form-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            tabIndex={2}
                            value={this.state.data.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    {this.state.registrationForm && (
                        <div className="LoginScreen__form-field">
                            <label htmlFor="passwordConfirm">Confirm Password</label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                id="passwordConfirm"
                                autoComplete="new-password"
                                tabIndex={3}
                                value={this.state.data.passwordConfirm}
                                onChange={this.handleChange}
                            />
                        </div>
                    )}

                    <div className="LoginScreen__form-actions">
                        <button type="button" onClick={this.toggleRegistrationForm}>
                            {this.state.registrationForm ? 'Back' : 'New Account'}
                        </button>
                        <button type="submit">
                            {this.state.registrationForm ? 'Register' : 'Login'}
                        </button>
                    </div>
                </form>
            </Screen>
        );
    }
}
