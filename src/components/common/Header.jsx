import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;
        {console.log(this.props)}
       ///{console.log(this.props.loggedIn.onClick)}

        return (
            <header className="header_nav">
                <h1 className="title">Hotels Catalog</h1>
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                {!loggedIn && <NavLink to="/create" activeClassName="active">Create Hotel</NavLink>}
                {loggedIn && <a href="javascript:void(0)" onClick={onLogout} className="active">Logout</a>}
               
                {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
            </header>
        );
    }
}