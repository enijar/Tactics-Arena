import React, {createRef} from "react";
import {withRouter} from "react-router-dom";
import AppContext from "../Decorators/AppContext";
import BaseScreen from "./BaseScreen";
import Screen from "../Components/Screen";
import Request from "../app/Request";
import Validator from "../../../common/Validator/index";
import config from "../../../common/config";

@AppContext
@withRouter
export default class LoginScreen extends BaseScreen {
    state = {
        registrationForm: false,
        errors: [],
        data: {
            name: '',
            password: '',
            passwordConfirm: ''
        }
    };

    handleSubmit = async event => {
        event.preventDefault();

        const formType = this.state.registrationForm ? 'register' : 'login';
        const validation = Validator.validate(this.state.data, config.validators[formType](this.state.data));

        if (!validation.passed) {
            this.setState({errors: validation.getErrors()});
            return;
        }

        await this.setState({errors: []});
        const res = await Request.post(`/api/${formType}`, this.state.data);

        if (!res.success) {
            this.setState({errors: res.errors});
            return;
        }

        await this.setState({errors: []});
        this.props.history.push('/lobby');
    };

    handleChange = event => {
        const {data} = this.state;
        data[event.target.name] = event.target.value;
        this.setState({data});
    };

    toggleRegistrationForm = () => {
        this.setState({registrationForm: !this.state.registrationForm, errors: []});
    };

    render() {
        return (
            <Screen name="LoginScreen">
                <form
                    onSubmit={this.handleSubmit}
                    className={`LoginScreen__form ${this.state.registrationForm ? 'LoginScreen__form--registration' : ''}`}
                >
                    {this.state.errors.length > 0 && (
                        <div className="LoginScreen__errors">
                            {this.state.errors.map((error, index) => (
                                <div key={index} className="LoginScreen__errors-error">
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="LoginScreen__form-field">
                        <label htmlFor="name">Name</label>
                        <input
                            maxLength={15}
                            type="text"
                            name="name"
                            id="name"
                            autoFocus
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
