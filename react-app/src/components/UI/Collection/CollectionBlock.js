import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './CollectionBlock.css';

import EditCollectionModal from './EditCollectionModal/EditCollectionModal';
import { removeCollection } from '../../../store/collections';

export default function CollectionBlock({ collection }) {
	const dispatch = useDispatch();

	const deleteCollectionHandler = () => {
		dispatch(removeCollection(collection.id));
	};
	// console.log(collection.coins_in);
	return (
		<div className="collection__container">
			<NavLink to={`/collections/${collection.id}`}>
				<div className="collection__image--grid">
					{collection?.coins_in?.slice(0, 4).map(coin => {
						return <img src={coin.reverse_photo} className="collection__image" alt="collection-coin"></img>;
					})}
				</div>
				{/* <img
					src="https://i.stack.imgur.com/y9DpT.jpg"
					width="300"
					className="collection__image"
					alt="collection_img"
				></img> */}
			</NavLink>
			<NavLink to={`/collections/${collection.id}`}>
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
			<div className="collection__btns">
				{collection.name === 'All Coins' || collection.name === 'Wishlist' ? (
					<></>
				) : (
					<>
						<EditCollectionModal collection={collection} />
						<button className="coin__add-to-collection--btn" onClick={deleteCollectionHandler}>
							<i class="far fa-trash-alt"></i> Delete
						</button>
					</>
				)}
			</div>
		</div>
	);
}
