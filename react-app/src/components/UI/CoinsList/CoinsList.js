import React, { useEffect } from 'react';
import CoinBlock from './CoinsBlock';
import './CoinsList.css';
import { useSelector, useDispatch } from 'react-redux';

export default function CoinsList() {
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(getCoins());
	// }, [dispatch]);

	const coins = useSelector(state => state.coins);

	let arr = [];
	for (let i in coins) {
		arr.push(coins[i]);
	}

	return (
		<>
			<div className="coins-list__container">
				{arr.map(coin => {
					return <CoinBlock coin={coin} key={coin.id} />;
				})}
				<div className="coin__container">
					<div>
						<i class="fas fa-plus add-coin_img"></i>
					</div>
					<div className="coin__title">Add new coin</div>
					<button className="coin__add-to-collection--btn">Add New Coin</button>
				</div>
			</div>
		</>
	);
}
