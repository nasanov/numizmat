import React, { useState, useEffect } from 'react';
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
		// console.log(coin_collection.coin.name);
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

	useEffect(() => {
		setCollection(collections_array[0].id);
	}, []);

	return (
		<div className="collection-form__div">
			<form className="collection-form__main" onSubmit={handleSubmit}>
				{errors.length ? (
					<div className="errorsContainer">
						<span>The following errors occurred:</span>
						<ul className="errorsList">
							{errors?.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
					</div>
				) : (
					<div></div>
				)}
				<div className="addToCollection-form__div">
					<label htmlFor="addToCollection--title">Choose your collection:</label>
					<select
						id="addToCollection--title"
						value={collection.id}
						className="addToCollection-form__input"
						onChange={e => setCollection(parseInt(e.target.value))}
					>
						Your collections
						{collections_array.map(collection => {
							return (
								<option value={collection.id} key={collection.id}>
									{collection.name}
								</option>
							);
						})}
					</select>
				</div>
				<button className="addToCollection-form__button" type="submit">
					Add to Collection
				</button>
			</form>
		</div>
	);
}
