import React from 'react';
import './CoinBlock.css';
import { NavLink } from 'react-router-dom';

export default function CoinBlock({ coin }) {
	return (
		<div className="coin__container">
			<div>
				<NavLink to={`/coins/${coin.id}`}>
					<img src={coin.reverse_photo} alt={`${coin.name}`} className="coin_img"></img>
					{/* <img src={coin['reverse_photo ']} alt={`${coin.name}`} className="coin_img"></img> */}
				</NavLink>
			</div>
			<div className="coin__title">
				<NavLink to={`/coins/${coin.id}`}>
					<span>{coin.name}</span>
				</NavLink>
			</div>
			{/* <div className="coin__additional-info">
				<span>{coin['value ']}</span>
			</div> */}
			<button className="coin__add-to-collection--btn">Add</button>
		</div>
	);
}
