import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import CoinsList from './CoinsList/CoinsList';
import Footer from './Footer/Footer';
import './UI.css';
import { getCollections } from '../../store/collections';
import { getCoins } from '../../store/coins';
import { getCategories } from '../../store/categories';
import ArrowTop from './ArrowTop/ArrowTop';

const UI = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCoins());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getCollections());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	return (
		<>
			<NavBar />
			<ArrowTop />
			<div className="main__container">
				<SideBar setSearchTerm={setSearchTerm} />
				<CoinsList setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
			</div>
			<Footer />
		</>
	);
};

export default UI;
