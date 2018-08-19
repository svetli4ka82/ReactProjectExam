import React, { Component } from 'react';
import Input from '../common/Input';
import firebase from './../../models/firebase';
import toastr from 'toastr';
import { withRouter } from 'react-router-dom';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: '',
            error: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        if (this.state.name === '' || this.state.name === 'undefined'
            || this.state.email === '' || this.state.email === 'undefined'
            || this.state.password === '' || this.state.repeat === '') {
            this.setState({
                error: {
                    message: 'Check the form for errors',
                }
            });
            return;
        }

        if (this.state.password !== this.state.repeat) {
            this.setState({
                error: {
                    message: 'Check the form for errors',
                    errors: {
                        repeat: "Passwords don't match"
                    }
                }
            });
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(() => {
            console.log('registered')
            this.props.history.push('/login');
            toastr.success('Registered successfully');
        }).catch(err => {
            this.setState({ error: err });
            toastr.error('Registration is not successfully');
            return;
        })
    }

    render() {
        if (this.state.error) {
            return (
                < div className="error">
                    <h2>{this.state.error.message}</h2>
                </div >
            )
        }
        return (
            <div className="container">
                <h1 className="pageTitle">Register</h1>
                {this.state.error}
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                    />
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password"
                    />
                    <Input
                        name="repeat"
                        type="password"
                        value={this.state.repeat}
                        onChange={this.onChangeHandler}
                        label="Repeat password"
                    />
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
            </div>
        );
    }
}

export default withRouter(RegisterPage);