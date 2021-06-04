import React from 'react';
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import CoinsList from './CoinsList/CoinsList';
import './UI.css';

const UI = () => {
	return (
		<>
			<NavBar />
			<div className="main__container">
				<SideBar />
				<CoinsList />
			</div>
		</>
	);
};

export default UI;
