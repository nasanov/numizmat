import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
// import { useSelector } from 'react-redux';


function Navigation() {
	// const user = useSelector(state => state.session.user);

	return (
		<nav className="main-nav">
			<NavLink to="/" className="main-nav-home">
				Numizmat
			</NavLink>
			<NavLink to="/coins" className="main-nav-home">
				Coins
			</NavLink>
			<NavLink to="/collections" className="main-nav-home">
				My Collections
			</NavLink>
			<form className="nav-search">
				<input type="text" placeholder="Search..." className="nav-searchBar" />
			</form>
			<div className="username_logo">
				<span className="username">username</span>
				<div className="nav-logo">
				</div>
			</div>
		</nav>
	);
}

export default Navigation;
