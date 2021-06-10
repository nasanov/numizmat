import React from 'react';
import NavBar from '../NavBar/NavBar';
import LogoutButton from '../../auth/LogoutButton';
import Footer from '../Footer/Footer';

import splashImage from '../../../images/back.jpg';
import anatomyOfCoin from '../../../images/learn_collecting_315x180.jpg';
import coinSpecs from '../../../images/coin_specifications_feature_300x180.png';
import collectingBasics from '../../../images/get_started_450x200.png';
import news_1 from '../../../images/apollo_coty_feature_350x180.jpg';
import coinProduction from '../../../images/coin_production_graphic_450x200.jpg';
import sfMint from '../../../images/US-Mint-at-San-Francisco-official-photo-1024x768.jpg';
import './Splash.css';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import { useHistory } from 'react-router-dom';

export default function Splash() {
	const user = useSelector(state => state.session.user);

	const dispatch = useDispatch();
	const history = useHistory();
	const onLogout = async e => {
		dispatch(logout());
		history.push('/');
	};

	return (
		<>
			<div className="splash__container">
				{/* <NavBar /> */}
				<nav className="splash__nav">
					{user ? (
						<>
							<div className="username_logo">
								<i className="fa fa-user"></i>
								<span className="username">{user?.username}</span>
							</div>

							<button onClick={onLogout} className="splash__nav-link">
								<i className="fas fa-sign-out-alt"></i>Logout
							</button>
							{/* <LogoutButton className="splash__nav-link" /> */}
						</>
					) : (
						<>
							<NavLink to="/login" exact={true} className="splash__nav-link" activeClassName="active">
								Login
							</NavLink>
							<NavLink to="/sign-up" exact={true} className="splash__nav-link" activeClassName="active">
								Sign Up
							</NavLink>
						</>
					)}
				</nav>
				<div className="splash__background--container">
					<img src={splashImage} className="splash__background--image"></img>
					<h1 className="splash__background--text"> Welcome to Numizmat</h1>
					<p className="splash__background--quote">
						"Coin collecting is the only hobby where you can spend all your money and still have some left."
					</p>
				</div>

				{/* link to the login and signup pages */}
				<div className="splash__content--container">
					<h3 className="splash__learn--title">Learn</h3>
					<div className="splash__learn">
						<div className="splash__learn--content">
							<a href="https://www.usmint.gov/learn/collecting-basics/anatomy-of-a-coin">
								<div className="content__title">Anatomy of a Coin</div>
								<img src={anatomyOfCoin} className="splash__content--image"></img>
								<p className="splash__content--description">
									Learn the parts of a coin and other terminology.
								</p>
							</a>
						</div>
						<div className="splash__learn--content">
							<a href="https://www.usmint.gov/learn/coin-and-medal-programs/coin-specifications">
								<div className="content__title">Coin Specifications</div>
								<img src={coinSpecs} className="splash__content--image"></img>
								<p className="splash__content--description">
									Learn about the weight, composition, and diameter of U.S. coins.
								</p>
							</a>
						</div>
						<div className="splash__learn--content">
							<a href="https://www.usmint.gov/learn/collecting-basics">
								<div className="content__title">Collecting Basics</div>
								<img src={collectingBasics} className="splash__content--image"></img>
								<p className="splash__content--description">Learn coin collecting basics.</p>
							</a>
						</div>
					</div>
					<h3 className="splash__news--title">News</h3>
					<div className="splash__news">
						<div className="splash__news--content">
							<a href="https://www.usmint.gov/news/inside-the-mint/apollo-11-50th-anniversary-coin-wins-2021-coin-of-the-year-award">
								<div className="content__title">2021 Coin of the Year award</div>
								<img src={news_1} className="splash__content--image"></img>
								<p className="splash__content--description">
									Celebrate the 2021 Coin of the Year award winner.
								</p>
							</a>
						</div>
					</div>
					<h3 className="splash__about--title">About</h3>
					<div className="splash__about">
						<div className="splash__about--content">
							<a href="https://www.usmint.gov/learn/history/coin-production">
								<div className="content__title">Coin Production</div>
								<img src={coinProduction} className="splash__content--image"></img>
								<p className="splash__content--description">
									The U.S. Mint is one of the largest mints in the world.
								</p>
							</a>
						</div>
						<div className="splash__about--content">
							<a href="https://www.usmint.gov/about/mint-tours-facilities/san-francisco#videos">
								<div className="content__title">U.S. Mint San Francisco Facility</div>
								<img src={sfMint} className="splash__content--image"></img>
								<p className="splash__content--description">
									The United States Mint at San Francisco plays an important role in our nation’s
									coinage.
								</p>
							</a>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

// https://www.usmint.gov/learn/history
