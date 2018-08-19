import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage, { loginUser } from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import CreatePage from './components/Create/CreatePage';
import DetailsPage from './components/Details/DetailsPage';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/common/Header';
import firebase, { auth } from './models/firebase';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      logIn:false
    }
    this.onLogout = this.onLogout.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
  }

  onLogout() {
   localStorage.clear();
    auth.signOut()
      .then(() => {
        this.setState({
          logIn: false
        });
      });
    this.props.history.push('/');
  }

  loggedIn() {
    localStorage.getItem('authToken') != null;
    firebase.auth().onAuthStateChanged(user => {
      if(user){this.setState({logIn:true})}
      else this.setState({logIn:false})
    })
  }

  render() {
    return (
      <div className="App">
    
        <Header loggedIn={localStorage.getItem('authToken') !==null } onLogout={this.onLogout} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/view/:page' component={HomePage} />

          <PrivateRoute path='/details/:id' component={DetailsPage} />
          <Route exact path='/create' component={CreatePage} />

          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />

        </Switch>
      </div>
    )
  }
}


export default withRouter(App);
