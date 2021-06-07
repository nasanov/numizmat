import React from 'react';
import { NavLink } from 'react-router-dom';
import './CollectionBlock.css';
export default function CollectionBlock({ collection }) {
	console.log(collection);
	return (
		<div className="collection__container">
			<NavLink to={`/collections/${collection.id}`}>
				<img src="https://i.stack.imgur.com/y9DpT.jpg" width="300"></img>
				<div className="collection__title">
					<span className="collection__title--value">
						<span className="collection__title--name">Name: </span>
						{collection.name}
					</span>
					<span className="collection__title--value">
						<span className="collection__title--name">Coins in collection: </span>
						{collection.coins_in.length}
					</span>
				</div>
			</NavLink>
		</div>
	);
}
