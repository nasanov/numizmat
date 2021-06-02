import React from 'react';
// import CoinBlock from './CoinBlock';
import './CoinsList.css';

export default function CoinsList() {
	return (
		<div className="coins-list__container">
			<h1 className="coins-list__header">All coins</h1>
			{/* {arr.map(coins => {
				return <coinsBlock coins={coins} key={coins.id} />;
			})} */}
		</div>
	);
}
