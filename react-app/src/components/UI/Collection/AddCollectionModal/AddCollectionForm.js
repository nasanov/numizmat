import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ############################################################### //
// ############################  CSS  ############################ //
// ############################################################### //
import './AddCollectionForm.css';

// ################################################################## //
// ############################  STORES  ############################ //
// ################################################################## //

import { addNewCollection } from '../../../../store/collections';

export default function AddCollectionForm({ setShowModal }) {
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [errors, setErrors] = useState('');
	const { user } = useSelector(state => state.session);

	if (!user) {
		return <Redirect to="/login" />;
	}

	const handleSubmit = async e => {
		e.preventDefault();
		const collection_info = {
			name,
		};

		let newCollection = await dispatch(addNewCollection(collection_info));

		if (newCollection.name) {
			setShowModal(false);
		} else {
			setErrors(newCollection.errors);
		}
	};

	return (
		<div className="collection-form__div">
			<form className="collection-form__main" onSubmit={handleSubmit}>
				<div className="collection-form__div">
					<input
						className="collection-form__input"
						type="text"
						placeholder="name"
						value={name}
						required
						onChange={e => setName(e.target.value)}
					></input>
				</div>
				<button className="collection-form__button" type="submit">
					Add Collection
				</button>
			</form>
		</div>
	);
}
