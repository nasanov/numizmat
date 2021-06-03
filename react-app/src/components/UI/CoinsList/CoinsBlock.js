import React, { useEffect } from 'react';
// import CoinBlock from './CoinBlock';
import './CoinBlock.css';
import { useSelector, useDispatch } from 'react-redux';
import { getCoins } from '../../../store/coins';

export default function CoinBlock({ coin }) {
	
	return (
		<div>
			<span>{coin.name}</span>
			<span>{coin['value']}</span>
			<img href={coin['obverse_photo']}></img>
		</div>
	);
}
