import React from 'react';
import { NavLink } from 'react-router-dom';
import './CollectionBlock.css';
export default function CollectionBlock({ collection }) {
	return (
		<div className="collection__container">
			<img src="https://i.stack.imgur.com/y9DpT.jpg" width="300"></img>
			<div className="collection__title">
				<NavLink to={`/collections/${collection.id}`}>
					<span>{collection.name}</span>
				</NavLink>
			</div>
		</div>
	);
}
