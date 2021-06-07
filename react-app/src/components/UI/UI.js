import React, { useState } from 'react';
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import CoinsList from './CoinsList/CoinsList';
import './UI.css';

const UI = () => {
	const [searchTerm, setSearchTerm] = useState('')

	return (
		<>
			<NavBar />
			<div className="main__container">
				<SideBar setSearchTerm={setSearchTerm}/>
				<CoinsList setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
			</div>
		</>
	);
};

export default UI;
