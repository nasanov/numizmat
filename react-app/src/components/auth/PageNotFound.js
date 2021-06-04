import React from 'react';
import { NavLink } from 'react-router-dom';
import './PageNotFound.css';
import logo from '../../images/giphy.gif';

const PageNotFound = () => {
	return (
		<>
			<div className="login-container">
				<div className="notfound__wrap">
					<img src={logo} className="notfound__logo" alt="notfound__logo"></img>
					<h1 className="notfound__text">this page doesn't exist</h1>
					<div className="notfound__links">
						<div className="notfound__signup-link">
							<p className="switchLinkName">New user?</p>
							<NavLink to="/sign-up" className="switchLink">
								Create an account
							</NavLink>
						</div>
						<div className="notfound__home-link">
							<p className="switchLinkName">Return to the</p>
							<NavLink to="/" className="switchLink">
								Home page
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageNotFound;
