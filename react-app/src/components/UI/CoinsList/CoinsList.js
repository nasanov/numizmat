import React from 'react';
import CoinBlock from './CoinsBlock';
import './CoinsList.css';
import { useSelector } from 'react-redux';
import AddCoinModal from '../SideBar/AddCoinModal';

export default function CoinsList({ searchTerm }) {
	const coins = useSelector(state => state.coins);
	const filteredCoins = useSelector(state => state.filteredCoins);

	let arr = [];
	if (filteredCoins['items']) {
		arr = filteredCoins['items'];
	} else {
		for (let i in coins) {
			arr.push(coins[i]);
		}
	}

	return (
		<>
			{/* <span>{arr.length}: coins found</span> */}
			<div className="coins-list__container">
				{arr
					?.filter(coin => {
						if (searchTerm === '') {
							return coin;
						} else if (coin.name.toLowerCase().includes(searchTerm.toLowerCase())) {
							return coin;
						} else return null;
					})
					.map(coin => {
						return <CoinBlock coin={coin} key={coin.id} />;
					})}
				<div className="coin__container">
					<div>
						<i className="fas fa-plus add-coin_img"></i>
					</div>
					{/* <div className="coin__title">Add new coin</div> */}
					<AddCoinModal />
				</div>
			</div>
		</>
	);
}
