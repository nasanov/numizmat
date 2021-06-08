import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ############################################################### //
// ############################  CSS  ############################ //
// ############################################################### //
import './AddToCollectionForm.css';

// ################################################################## //
// ############################  STORES  ############################ //
// ################################################################## //

import { addToCollection } from '../../../../store/collections';

export default function AddToCollectionForm({ setShowModal, coin }) {
	const dispatch = useDispatch();

	const collections = useSelector(state => state.collections);
	const [collection, setCollection] = useState('');
	const [errors, setErrors] = useState([]);

	const handleSubmit = async e => {
		e.preventDefault();

		const coin_collection_info = {
			collectionId: collection,
			coinId: coin.id,
		};

		let coin_collection = await dispatch(addToCollection(coin_collection_info));
		console.log(coin_collection.coin.name);
		if (coin_collection.coin.name) {
			setShowModal(false);
		} else {
			setErrors(coin_collection.errors);
		}
	};

	let collections_array = [];
	for (let i in collections) {
		collections_array.push(collections[i]);
	}
	// console.log(collection.id);
	// console.log(coin.id);
	useEffect(() => {
		setCollection(collections_array[0].id);
	}, []);

	return (
		<div className="collection-form__div">
			<form className="collection-form__main" onSubmit={handleSubmit}>
				<div className="collection-form__div">
					<label htmlFor="users-collections">Choose your collection:</label>
					<select
						id="users-collections"
						value={collection.id}
						onChange={e => setCollection(parseInt(e.target.value))}
					>
						Your collections
						{collections_array.map(collection => {
							return <option value={collection.id}>{collection.name}</option>;
						})}
					</select>
				</div>
				<button className="collection-form__button" type="submit">
					Add to Collection
				</button>
			</form>
		</div>
	);
}
