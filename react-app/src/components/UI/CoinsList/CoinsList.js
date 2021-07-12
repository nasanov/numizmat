import React, { useEffect, useState } from 'react';
import CoinBlock from './CoinsBlock';
import './CoinsList.css';
import { useSelector, useDispatch } from 'react-redux';
import AddCoinModal from '../SideBar/AddCoinModal';

const coinsPerPage = 20;
let arrayForCoins = [];

export default function CoinsList({ searchTerm }) {
	const coins = useSelector(state => state.coins);
	const filteredCoins = useSelector(state => state.filteredCoins);
	const [coinsToShow, setCoinsToShow] = useState([]);
	const [next, setNext] = useState(0);

	// let dispatch = useDispatch();
	let arr = [];
	// if (filteredCoins['items']) {
	// 	arr = filteredCoins['items'];
	// } else {
	// 	for (let i in coins) {
	// 		arr.push(coins[i]);
	// 	}
	// }

	for (let i in coins) {
		arr.push(coins[i]);
	}

	console.log('coins', coins);
	console.log('arr', arr);
	console.log('coinsToShow', coinsToShow);

	const loopWithSlice = (start, end) => {
		const slicedPosts = arr.slice(start, end);
		console.log('slice', slicedPosts);
		arrayForCoins = [...arrayForCoins, ...slicedPosts];
		setCoinsToShow(arrayForCoins);
	};

	useEffect(() => {
		console.log('use effect first');
		loopWithSlice(0, coinsPerPage);
		console.log('use effect last');
	}, []);

	const handleLoadMore = () => {
		loopWithSlice(next, next + coinsPerPage);
		setNext(next + coinsPerPage);
	};

	return (
		<div className="coins-list__wrapper">
			<span>{coinsToShow.length}: coins found</span>
			{/* <div className="coins-list__container">
				{arr
					?.filter(coin => {
						if (searchTerm === '') {
							return coin;
						} else if (coin.name.toLowerCase().includes(searchTerm.toLowerCase())) {
							return coin;
						} else return null;
					})
					.reverse()
					.slice(0, 47)
					.map(coin => {
						return <CoinBlock coin={coin} key={coin.id} />;
					})}
				<div className="coin__container">
					<div>
						<i className="fas fa-plus add-coin_img"></i>
					</div>
					<AddCoinModal />
				</div>
			</div> */}
			<div className="coins-list__container">
				{/* if searchTerm is not null , search in arr, else search in ocinsSHow */}
				{coinsToShow
					?.filter(coin => {
						if (searchTerm === '') {
							return coin;
						} else if (coin.name.toLowerCase().includes(searchTerm.toLowerCase())) {
							return coin;
						} else return null;
					})
					// .reverse()
					// .slice(0, 47)
					?.map(coin => {
						return <CoinBlock coin={coin} key={coin.id} />;
					})}
				<div className="coin__container">
					<div>
						<i className="fas fa-plus add-coin_img"></i>
					</div>
					<AddCoinModal />
				</div>
			</div>
			<button className="loadmore" onClick={handleLoadMore}>
				Load more
			</button>
		</div>
	);
}
