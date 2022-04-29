import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { login } from "../redux/actions/auth";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            email: "",
            password: "",
            loading: false
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({
            loading: true
        });
        this.form.validateAll();
        const { dispatch, history } = this.props;
        if (this.checkBtn.context._errors.length === 0) {
            dispatch(login(this.state.email, this.state.password))
                .then(() => {
                    history.push("/profile");
                    window.location.reload();
                })
                .catch(() => {
                    this.setState({
                        loading: false
                    });
                });
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const { isLoggedIn, message } = this.props;
        if (isLoggedIn) {
            return <Navigate to="/profile"/>;
        }
        return (
            <Form
                onSubmit={this.handleLogin}
                ref={(c) => {
                    this.form = c;
                }}
            >
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email
                        address</label>
                    <Input
                        type="email" id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[ required ]}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                    <Input
                        type="password" id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[ required ]}
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                </button>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                        this.checkBtn = c;
                    }}
                />
            </Form>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.user;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);
