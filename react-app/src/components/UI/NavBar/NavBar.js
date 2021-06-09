import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.css';
import LogoutButton from '../../auth/LogoutButton';
// import Collection from '../Collection/Collection';
import Search from '../Search/Search';

function Navigation() {
	const user = useSelector(state => state.session.user);
	const collection = useSelector(state => state.collections);

	var collectionIds = Object.keys(collection);
	var wishlistId = collectionIds.find(id => collection[id]['name'] === 'Wishlist');

	return (
		<nav className="main-nav">
			<NavLink to="/" className="main-nav-home">
				Numizmat
			</NavLink>
			<Search />
			<div className="main-nav-list">
				<NavLink to="/home" className="main-nav-home">
					<i className="fas fa-coins"></i> Coins
				</NavLink>
				<NavLink to="/collections" className="main-nav-home">
					<i className="fas fa-th"></i>My Collections
				</NavLink>
				<NavLink to={`/collections/${wishlistId}`} className="main-nav-home">
					<i className="fa fa-star"></i>WishList
				</NavLink>
			</div>
			{/* <NavLink to="/users" exact={true} className="main-nav-home" activeClassName="active">
				Users
			</NavLink> */}
			{user ? (
				<>
					<div className="username_logo">
						<i className="fa fa-user"></i>
						<span className="username">{user?.username}</span>
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
