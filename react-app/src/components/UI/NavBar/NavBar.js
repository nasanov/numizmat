import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.css';
import LogoutButton from '../../auth/LogoutButton';

function Navigation() {
	const user = useSelector(state => state.session.user);

	return (
		<nav className="main-nav">
			<NavLink to="/" className="main-nav-home">
				Numizmat
			</NavLink>
			<NavLink to="/home" className="main-nav-home">
				Coins
			</NavLink>
			<NavLink to="/collections" className="main-nav-home">
				My Collections
			</NavLink>
			<form className="nav-search">
				<input type="text" placeholder="Search..." className="nav-searchBar" />
			</form>
			<NavLink to="/users" exact={true} className="main-nav-home" activeClassName="active">
				Users
			</NavLink>
			{user ? (
				<>
					<div className="username_logo ">
						<span className="username">{user?.username}</span>
						<div className="nav-logo"></div>
					</div>
					<LogoutButton />
				</>
			) : (
				<>
					<NavLink to="/login" exact={true} className="main-nav-home" activeClassName="active">
						Login
					</NavLink>
					<NavLink to="/sign-up" exact={true} className="main-nav-home" activeClassName="active">
						Sign Up
					</NavLink>
				</>
			)}
		</nav>
	);
}

export default Navigation;
