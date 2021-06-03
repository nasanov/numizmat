import React, { useEffect } from 'react';
import CoinBlock from './CoinsBlock';
import './CoinsList.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCoins } from '../../../store/coins';

export default function CoinsList() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCoins());
	}, [dispatch]);

	const coins = useSelector(state => state.coins);

	let arr = [];
	for (let i in coins) {
		arr.push(coins[i]);
	}

	return (
		<div className="coins-list__container">
			<h1 className="coins-list__header">All coins</h1>
			{arr.map(coin => {
				return <CoinBlock coin={coin} key={coin.id} />;
			})}
		</div>
	);
}
