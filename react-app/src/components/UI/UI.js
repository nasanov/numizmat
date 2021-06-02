import React from 'react';
import NavBar from './NavBar/NavBar';
import CoinsList from './CoinsList/CoinsList'

const UI = () => {
	return (
		<>
			<NavBar />
			{/* <Filters /> */}
			<CoinsList />
		</>
	);
};

export default UI;
