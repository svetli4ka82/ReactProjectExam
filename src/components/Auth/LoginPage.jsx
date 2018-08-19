import React, { Component } from 'react';
import Input from '../common/Input';
import { withRouter } from 'react-router-dom';
import firebase from './../../models/firebase';
import toastr from 'toastr';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
       
        firebase.auth().signInWithEmailAndPassword(
            this.state.email,
            this.state.password
        ).then(() => {
            console.log('login')
            this.props.history.push('/view/:page');

            toastr.success('Login successfully');
        }).catch(err => {
            this.setState({ error: err });
            toastr.error('Login is not successfully');
            return;
        })
    }
    
    render() {
        if (this.state.error) {
            return (
                <div className="error">
                    <h2>{this.state.error.message}</h2>
                </div >
            )
        }
        return (
            <div className="container">
                <h1 className="pageTitle">Login</h1>
                {this.state.error}
                <form onSubmit={this.onSubmitHandler}>
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
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
            </div>
        );
    }
}

export default withRouter(LoginPage );
